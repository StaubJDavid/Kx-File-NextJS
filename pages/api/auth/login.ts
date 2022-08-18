// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import User from "../../../lib/mongodb/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import authValidator from '../../../lib/validations/authValidation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log(req.body);
    if(req.method === "POST"){
        try {
            const loginResult = await loginPost(req);
            res.status(200).json(loginResult);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }else{
        res.status(405).send("No such request method allowed");
    }
}

const loginPost = async (req:NextApiRequest) => {
    await dbConnect();
    let errors:any = {};

    //Validation test
    authValidator.loginValidation(req.body);

    //Get users based on email and username
    const findUsers = await User.find({"email": req.body.email});

    if(findUsers.length === 0){
        errors.user = "No E-mail registered";
        throw errors;
    }

    if(findUsers.length >= 2){
        errors.user = "More than 1 e-mail registered? HOW?";
        throw errors;
    }

    const user = findUsers[0];

    if(!bcrypt.compareSync(req.body.password, user.password)){
        errors.password = "Wrong password";
        throw errors;
    }

    const userToken = jwt.sign(
        {
            root: user.name,
            id: user._id,
            username: user.name
        },
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
        );
    
    return {token: userToken};
};