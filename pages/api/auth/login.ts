// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import User from "../../../lib/mongodb/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';
import {Response} from 'express';
import stream from 'stream';
import { promisify } from 'util';


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log(req.body);
    if(req.method === "POST"){
        try {
            const loginResult = loginPost(req);
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
    const user = await User.find({email: req.body.email});

    return user;
};