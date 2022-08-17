import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';
import {Response} from 'express';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

export default async function downloadFile(req:NextApiRequest, res:NextApiResponse) {
    console.log(req.body);
    const folder = req.body.path;
    const filename = req.body.filename;

    console.log(folder, filename);

    const postsDirectory = path.join(process.cwd(), 'backend', "files", folder, filename);
    console.log(postsDirectory);

    try {
        if(fs.existsSync(postsDirectory)){
            const data = fs.readFileSync(postsDirectory);
            res.status(200).send(data)
        }else{
            res.status(400).json({ error: "XD" });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
  