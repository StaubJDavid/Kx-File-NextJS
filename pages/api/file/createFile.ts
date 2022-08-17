// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import File from "../../../lib/mongodb/models/File";

export default async function MongoCreateFolder(req, res){
    await dbConnect();
/*
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, required:true},
    name: {type: String, required:true},
    created: { type: Date, default: Date.now },
    path: {type: String, required:true},
    size: {type: Number, required:true},
    length: {type: Number, required: isVideo },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true} */
    try {
        /*const files = await File.insertMany([
            {
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "Video",
                name: "Video.mp4",
                path: "username",
                size: 69,
                length: 420,
                parent: "62fbbe1d3378210c07e07631"
            },
            {
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "File",
                name: "File.js",
                path: "username",
                size: 333,
                parent: "62fbbe1d3378210c07e07631"
            },
            {
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "Image",
                name: "Image.png",
                path: "username",
                size: 212,
                parent: "62fbbe1d3378210c07e07631"
            },
        ]);*/

        /*const files = await File.create({
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "Video",
                name: "Video32.mp4",
                path: "username",
                size: 69,
                parent: "62fbbe1d3378210c07e07631"
            });*/

        const files = await File.insertMany([
            {
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "Video",
                name: "Video532.mp4",
                path: "username",
                size: 69,
                parent: "62fbbe1d3378210c07e07631"
            },
            {
                owner: "62fbb9bbdcb13f1ea513983c",
                type: "Video",
                name: "Video342.mp4",
                path: "username",
                size: 69,
                parent: "62fbbe1d3378210c07e07631"
            }
        ]);

        res.status(201).json(files);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};