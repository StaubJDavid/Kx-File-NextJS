import mongoose from "mongoose";

import User from './User';

const FileSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, required:true},
    name: {type: String, required:true},
    created: { type: Date, default: Date.now },
    path: {type: String, required:true},
    size: {type: Number, required:true},
    length: {type: Number, required: isVideo },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true}
}
);

function isVideo(){
    return this.type === "Video";
}

export default mongoose.models.File || mongoose.model('File', FileSchema);