const Admin = require("../Models/Admin.model");
const Manager = require("../Models/Manager.model");
const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const Login = async (req, res) => {
    const {email, password, role} = req.body.data;

    if(role ==="Admin"){
        const data = await Admin.findOne({email});

        if(data && (await bcrypt.compare(password, data.password))){
            const token = jwt.sign({id: data._id},
                'shhhh',
                {
                    expiresIn: "2h"
                }
            )
            data.token = token;
            data.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 *60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie("token", token, options).json({msg: "Admin LoggedIn Successfully!" ,d: data});
        }else{
            res.json({msg: "Email or Password is Incorrect!"});
        }
    }else if(role ==="Manager"){
        const data = await Manager.findOne({email});

        if(data && (await bcrypt.compare(password, data.password))){
            const token = jwt.sign({id: data._id, email},
                'shhhh',
                {
                    expiresIn: "2h"
                }
            )
            data.token = token;
            data.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 *60 * 1000)
            };
            res.status(200).cookie("token", token, options).json({msg: "Manager LoggedIn Successfully!" ,d: data});
        }else{
            res.json({msg: "Email or Password is Incorrect!"});
        }
    }else if(role ==="User"){
        const data = await User.findOne({email});

        if(data && (await bcrypt.compare(password, data.password))){
            const token = jwt.sign({id: data._id, email},
                'shhhh',
                {
                    expiresIn: "2h"
                }
            )
            data.token = token;
            data.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 *60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie("token", token, options).json({msg: "User LoggedIn Successfully!" ,d: data});
        }else{
            res.json({msg: "Email or Password is Incorrect!"});
        }
    }
}

module.exports = { Login };