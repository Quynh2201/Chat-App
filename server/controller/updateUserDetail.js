const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetail(req, res) {
    try{
        const token = req.cookies.token || "";
        const user = await getUserDetailFromToken(token);
        const {username, profile_pic} = req.body;
        const updateUser = await UserModel.updateOne({ _id: user._id}, {
            username,
            profile_pic
        });

        const userInfor = await UserModel.findById(user._id);

        return res.json({
            message: "User update successfully!",
            data: userInfor,
            success: true
        })

    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            error: true
        })
    }
}

module.exports = updateUserDetail;