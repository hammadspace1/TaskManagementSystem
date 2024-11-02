const Manager = require("../Models/Manager.model");
const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
    const {name, email, role, password} = req.body.dataE;

    if(role === "Manager"){
        
        try {
            const result = await Manager.findOne({email});

            if(result){
                res.json({msg: "Sorry this Manager Already Exists!"})
            }else{
                const encpassword = await bcrypt.hash(password, 10);

                const data = await Manager.create({
                    name: name,
                    email: email,
                    role: role,
                    password: encpassword,
                    date: new Date().toDateString(),
                    status: false
                })

                const token = jwt.sign(
                    {id: data._id, email},
                    'shhhh',
                    {
                        expiresIn: "2h"
                    }
                );

                data.token = token
                res.json({msg: "Manager SignedUp Successfully!"});
                await data.save();
            }
        } catch (error) {
            console.log(error)
        }
    }else if(role ==="User"){

        try {
            const result = await User.findOne({email})
            if(result){
                res.json({msg: "Sorry this User Already Exists!"})
            }else{
                const encpassword = await bcrypt.hash(password, 10);

                const data = await User.create({
                    name: name,
                    email: email,
                    role: role,
                    password: encpassword,
                    date: new Date().toDateString(),
                    status: false
                })

                const token = jwt.sign(
                    {id: data._id, email},
                    'shhhh',
                    {
                        expiresIn: "2h"
                    }
                );
    
                data.token = token;
                res.json({msg: "User Added Successfully!"});
                await data.save();
            }
        } catch (error) {
            console.log(error)
        } 
    }


}

module.exports = {SignUp};