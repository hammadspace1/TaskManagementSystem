const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
app.use(cookieParser)

const auth = (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({ msg: "Unauthorized - Login Required" });
    }

    try {
        const decode = jwt.verify(token, "shhhh");
        req.data = decode;

        return next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ msg: "Unauthorized - Invalid Token" });
    }

    
}

module.exports = auth;