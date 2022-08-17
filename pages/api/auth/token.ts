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
            const tokenResult = await tokenPost(req, res);
            //console.log(tokenResult);
            res.status(200).json({success: tokenResult});
        } catch (error) {
            console.log("Error CATCH");
            if(error === 0){
                console.log(error);
                return res.status(500).json({error: "No Auth Cookie"})
            }

            if(error === 1){
                console.log(error);
                return res.status(500).json({error: "Invalid Token"})
            }

            return res.status(500).json({error: "Unknown error"})
        }
    }else{
        res.status(405).send("No such request method allowed");
    }
}

const tokenPost = async (req:NextApiRequest, res:NextApiResponse) => {
    //console.log(req.cookies.Auth);
    if(req.cookies.Auth){
        try {
            var decoded = jwt.verify(req.cookies.Auth, process.env.JWT_SECRET);
            return true;
        } catch(err) {
            throw 1;
        }
    }else{
        throw 0;
    }
};