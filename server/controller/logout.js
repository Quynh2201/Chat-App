async function logout(req, res) {
    try{
        const cookieOptions = {
            http: true,
            secure: true
        }

        return res.cookie('token','', cookieOptions).status(200).json({
            message: "session out",
            success: true
        })
    } catch(e){
        return res.status(500).json({
            message: e.message || e,
            error: true
        })
    }
}

module.exports = logout;