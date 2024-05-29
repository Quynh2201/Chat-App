const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require("../routes");

async function checkPassword(req, res) {
    try{
        const {password, userId} = req.body;
        // Log để kiểm tra dữ liệu nhận được từ frontend
        console.log("Received data:", { userId, password });

        // Kiểm tra nếu thiếu userId hoặc password
        if (!userId || !password) {
            return res.status(400).json({
                message: "User ID and password are required",
                error: true
            });
        }
        const user = await UserModel.findById(userId);
        // Nếu người dùng không tồn tại
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

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
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY,{expiresIn: '1d'});
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
        console.error('Error in checkPassword:', e); // Log lỗi chi tiết
        return res.status(500).json({
            message: e.message || e,
            error: true
        })
    }
}

module.exports = checkPassword;