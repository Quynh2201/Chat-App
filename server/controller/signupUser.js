const bcrypt = require('bcryptjs');
const UserModel = require("../models/UserModel");
const { Schema } = require('mongoose');

async function signupUser(req, res) {
    try{
        const { username, email, password, profile_pic} = req.body;
        console.log("req body", req.body);

        const checkEmail = await UserModel.findOne({email})
        if(checkEmail){
            return res.status(400).json({
                message: "User already existed!",
                error: true,
            })
        }

        //password into hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Tao lai 1 UserModel moi voi hash password
        const payload = {
            username,
            email,
            profile_pic,
            password: hashpassword
        }

        const user = new UserModel(payload);
        const userSave = await user.save();

        return res.status(201).json({
            message: "User created successfully!",
            data: userSave,
            success: true 
        })

    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            e: true
        })
    }
}

module.exports = signupUser;