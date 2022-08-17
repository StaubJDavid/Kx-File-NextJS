// @ts-nocheck
import dbConnect from "../../../lib/mongodb/mongodb";
import User from "../../../lib/mongodb/models/User";

export default async function MongoCreateUser(req, res){
    await dbConnect();
    /*email: {type: String, required: true, unique: true, validate:[ isEmail, 'Invalid Email']},
    name: {type: String, unique: true, required: [true, 'name folder']},
    password: {type: String, required: true},
    created: { type: Date, default: Date.now }*/
    try {
        const user = await User.create({
            email:"email@gmail.com",
            name:"username",
            password:"password",
        });

        res.status(201).json(user);
    } catch (error) {
        const errors = {};
        if(error.errors.email) errors.email = "Email already in use";
        if(error.errors.name) errors.name = "Email already in use";
        console.log(errors);
        res.status(500).json(errors);
    }
};