import mongoose from "mongoose";

import File from './File';
import User from './User';

const FolderSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    root: {type: Boolean, required: true},
    name: {type: String, required: [true, 'name folder']},
    path: {type: String, required: true},
    created: { type: Date, default: Date.now },
    content: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    sub_folders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: notRootFolder}
}
);

function notRootFolder(){
    return !this.root;
}

export default mongoose.models.Folder || mongoose.model('Folder', FolderSchema);