// @ts-nocheck
import dbConnect from "../../lib/mongodb/mongodb";
import Folders from "../../lib/mongodb/models/Folder";

export default async function MongoCreateFolder(req, res){
    await dbConnect();

    try {
        /*const test = await Folders.create({
            root: true,
            name: "other",
            content: [
            {
                type: "File",
                name: "File.js",
                path: "babi",
                size: 69
            },
            {
                type: "Video",
                name: "Video.mp4",
                path: "babi",
                size: 69,
                length: 233
            },
            {
                type: "Image",
                name: "Image.png",
                path: "babi",
                size: 165
            }
            ]
        });*/

        res.status(201).json("d");
    } catch (error) {
        console.log(error);
        res.status(500).json("dsds");
    }
};