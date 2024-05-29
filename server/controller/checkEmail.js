const UserModel = require("../models/UserModel");

async function checkEmail(req, res) {
    try{
        const {email} = req.body;
        console.log("client email", email);
        const checkEmail = await UserModel.findOne({email}).select('-password');
        console.log("checkemail", checkEmail);

        if(!checkEmail) {
            return res.status(400).json({
                message: "User not exit",
                error: true
            })
        }

        return res.status(200).json({
            message: "Email verify",
            success: true,
            data: checkEmail
        })
    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            error: true
        })
    }
}

module.exports = checkEmail;