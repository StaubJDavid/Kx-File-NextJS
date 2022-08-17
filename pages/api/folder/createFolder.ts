// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import Folder from "../../../lib/mongodb/models/Folder";

export default async function MongoCreateFolder(req, res){
    await dbConnect();
/*
    owner: {type: User, required: true},
    root: {type: Boolean, required: true},
    name: {type: String, required: [true, 'name folder']},
    path: {type: String, required: true},
    created: { type: Date, default: Date.now },
    content: [File],
    sub_folders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: (val) => {return !val.root}} */
    try {
        const folder = await Folder.create({
            owner:"62fbb9bbdcb13f1ea513983c",
            root:false,
            name:"Sub Folder 2",
            path:"username",
            parent:"62fbbe1d3378210c07e07631"
        });

        res.status(201).json(folder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};