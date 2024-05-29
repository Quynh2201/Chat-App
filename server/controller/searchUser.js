const UserModel = require("../models/UserModel");

async function searchUser(req, res) {
    try{
        const {search} = req.body;
        const query = new RegExp(search, "i", "g");
        const user = await UserModel.find({
            "$or": [
                {username: query},
                {email: query}
            ]
        }).select("-password")

        return res.json({
            message: "all user",
            data: user,
            success: true
        })
    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            e: true
        })
    }
}

module.exports = searchUser;