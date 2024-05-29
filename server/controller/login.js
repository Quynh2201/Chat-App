const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require("../routes");

async function login(req, res) {
    try{
        const {email, password, userId} = req.body;
        const checkEmail = await UserModel.findOne({email}).select('-password');
        if(!checkEmail) {
            return res.status(400).json({
                message: "User not exit",
                error: true
            })
        }
        const user = await UserModel.findById(userId);
        const checkpassword = await bcrypt.compare(password, user.password);
        if(!checkpassword){
            return res.status(400).json({
                message: "Please check password",
                error: true
            })
        }

        const tokendata = {
            id: user._id,
            email: user.email,
        }
        const token = await jwt.sign(tokendata, process.env.JWT_SCREAT_KEY,{expiresIn: '1d'});
        const cookieOptions = {
            http: true,
            secure: true
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully!",
            token: token,
            success: true
        })

    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            error: true
        })
    }
}

module.exports = login;