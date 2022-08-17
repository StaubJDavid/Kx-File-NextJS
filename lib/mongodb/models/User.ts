import mongoose from "mongoose";
import { isEmail } from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, validate:[ isEmail, 'Invalid Email']},
    name: {type: String, unique: true, required: [true, 'name folder']},
    password: {type: String, required: true},
    created: { type: Date, default: Date.now }
}
);

UserSchema.plugin(uniqueValidator);

export default mongoose.models.User || mongoose.model('User', UserSchema);