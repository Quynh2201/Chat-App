const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");

async function userDetail(req, res) {
    try {
        console.log("req.cookies.token", req.cookies.token);
        const token = req.cookies.token || "";
        const user = await getUserDetailFromToken(token);
        console.log("user token", user);
        if (!user || user.logout) {
            return res.status(401).json({
                message: user.message || "Unauthorized",
                error: true
            });
        }

        
        return res.status(200).json({
            message: "User detail",
            data: user
        });
    } catch(e) {
        console.error("Error fetching user details:", e);
        return res.status(500).json({
            message: e.message || e,
            error: true
        });
    }
}

module.exports = userDetail;
