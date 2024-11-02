const Admin = require("../Models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSignUp = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const result = await Admin.findOne({});

        if(result){
            res.json({msg: "Sorry an Admin is Already exist"})
        }else{

            const encpassword = await bcrypt.hash(password, 10);

            const data = await Admin.create({
                name: name,
                email: email,
                role: "Admin",
                password: encpassword,
                status: false
            })

            const token = jwt.sign(
                {id: data._id, email},
                'shhhh',
                {
                    expiresIn: "2h"
                });

            data.token = token
            await data.save();
            res.json("Admin SignedUp Successfully!");
        }


        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {adminSignUp};