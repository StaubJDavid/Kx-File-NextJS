// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import User from "../../../lib/mongodb/models/User";
import Folder from "../../../lib/mongodb/models/Folder";
import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import authValidator from '../../../lib/validations/authValidation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log(req.body);
    if(req.method === "POST"){
        try {
            const registerResult = await registerPost(req, res);
            res.status(200).json(registerResult);
        } catch (error) {
            console.log("Error CATCH");
            if(error.response){
                console.log(error.response.data);
                res.status(500).json(error.response.data);
            }else{
                console.log(error);
                res.status(500).json(error); 
            }
        }
    }else{
        res.status(405).send("No such request method allowed");
    }
}

const registerPost = async (req:NextApiRequest, res:NextApiResponse) => {
    await dbConnect();
    let errors:any = {};

    //Validation test
    authValidator.registerValidation(req.body);

    //Get users based on email and username
    const findUsers = await User.find({
        $or: [
            {"email": req.body.email},
            {"name": req.body.username}
        ]
    })

    /*console.log("Wat");
    console.log(findUsers);*/

    //If there are results, check if username and or email is taken
    if(findUsers.length !== 0) {
        //console.log(findUsers);
        findUsers.forEach((val) => {
            if(val.email === req.body.email) errors.user_email = "An account with this email already exists";
            if(val.name === req.body.username) errors.user_username = "An account with this username already exists";
        });

        throw errors;
    } 

    //Create folder on Fileserver
    const createFolderToken = jwt.sign(
                                    {folder_name: req.body.username},
                                    process.env.JWT_SECRET,
                                    {expiresIn: '1h'}
                                    );

    //console.log(createFolderToken);
    console.log("Created JWT for folder creation on server");

    const createFolderResult = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/files/create-folder`,
                                        {},
                                        {
                                            headers: {
                                                "Authorization": `Bearer ${createFolderToken}`
                                            }
                                        }); 

    //console.log(createFolderResult.data);
    console.log("Created folder on server");

    //Create user in mongodb
        //Encrypt Password
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    
    const user = await User.create({
        email: req.body.email,
        name: req.body.username,
        password: encryptedPassword,
    });

    //console.log(user);
    console.log("Added User to db");

    //Create Root folder in mongodb
    const folder = await Folder.create({
        owner: user._id,
        root: true,
        name: req.body.username,
        path: req.body.username
    });

    //console.log(folder);
    console.log("Added Folder to db");

    //Return JWT

    const userToken = jwt.sign(
        {
            root: req.body.username,
            id: user._id,
            username: user.name
        },
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
        );
    //const user = await User.find({email: req.body.email});
    
    return {token: userToken}
};