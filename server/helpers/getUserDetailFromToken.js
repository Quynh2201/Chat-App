const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const getUserDetailFromToken = async(token) => {
    if(!token){
        return {
            message: "session out",
            logout: true,
        }
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decode", decode);

        const user  = await UserModel.findById(decode.id).select('-password');
        console.log("User", user);
        return user;
    } catch (error) {
        console.error("Error verifying token or fetching user:", error);
        throw new Error("Invalid token or user not found");
    }
}

module.exports = getUserDetailFromToken;