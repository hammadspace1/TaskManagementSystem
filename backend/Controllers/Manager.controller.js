const Manager = require("../Models/Manager.model");

const getAllManagers = async (req, res) => {
    try {
        const data = await Manager.find({status: 0});

        if(data.length > 0){
            res.json({msg: "All Managers Has Been Fetched!", d: data})
        }else{
            res.json({msg: "No Record Found!"})
        }
    } catch (error) {
        console.log(error);
    }
}

const DeleteManager = async (req, res) => {
    const {_id} = req.body.e;

    try {
        const filter = {_id: _id};
        const update = {status: 1};

        const data = await Manager.findOneAndUpdate(filter, update, {new: true});

        if(data.status === true){
            res.json({msg: "Manager Deleted Successfully!"})
        }else{
            res.json({msg: "Manager not Deleted"})
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {getAllManagers, DeleteManager};