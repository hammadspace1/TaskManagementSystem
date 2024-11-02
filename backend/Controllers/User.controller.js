const User = require("../Models/User.model");

const getAllUsers = async (req, res) => {
    try {
        const data = await User.find({status: 0});

        if(data.length > 0){
            res.json({msg: "All Users Has Been Fetched!", d: data})
        }else{
            res.json({msg: "No Record Found!"})
        }
    } catch (error) {
        console.log(error);
    }
}

const DeleteUser = async (req, res) => {
    const {_id} = req.body.e;

    try {
        const filter = {_id: _id};
        const update = {status: 1};

        const data = await User.findOneAndUpdate(filter, update, {new: true});

        if(data.status === true){
            res.json({msg: "User Deleted Successfully!"})
        }else{
            res.json({msg: "User not Deleted"})
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllUsers, DeleteUser};