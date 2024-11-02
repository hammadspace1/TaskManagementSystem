const Task = require("../Models/Task.model");

const AddNewTask = async (req, res) => {
    const {title, discription, assignedTo, taskFor} = req.body.taskData;

    const data = Task({
        title: title,
        discription: discription,
        assignedTo: assignedTo,
        taskFor: taskFor,
        taskStatus: "To_Do",
        status: false,
        date: new Date().toDateString()
    })

    try {
        await data.save();
        res.json({msg: "Task has been Added!"});
    } catch (error) {
        console.log(error)
    }
}

const GetAllTasks = async (req, res) => {
    try {
        const data = await Task.find({status: 0});

        if(data.length > 0){
            res.json({msg: "All Tasks has been Fetched!", d: data});
        }else{
            res.json({msg: "No Task Available!!!"});
        }
    } catch (error) {
        console.log(error)
    }
}

const DeleteTask = async (req, res) => {
    const {_id} = req.body.e;

    try {
        const filter = {_id: _id};
        const update = {status: true};

        const data = await Task.findOneAndUpdate(filter, update, {new: true});
        if(data.status === true){
            res.json({msg: "Task Deleted!"});
        }else{
            res.json({msg: "Task is not  Deleted!"});
        }
    } catch (error) {
        console.log(error);
    }
}

const TaskStatusUpdate = async (req, res) => {
    const {_id} = req.body.res;
    const {taskStatus} = req.body.taskStatus;

    try {
        const filter = {_id: _id};
        const update = {taskStatus: taskStatus};

        const data = await Task.findOneAndUpdate(filter, update, {new: true});

        if(data.taskStatus === taskStatus){
            res.json({msg: "Task State is Updeted! "})
        }else{
            res.json({msg: "Not Updated!!"});
        }
    } catch (error) {
        console.log(error);
    }

}

const GetManagerTasks = async (req, res) => {
    const email = req.body.email;

    try {
        const data = await Task.find({assignedTo: email});

        if(data.length > 0){
            res.json({msg: "Manager Tasks Fetched!!", d: data}); 
        }else{
            res.json({msg: "Nothing to Show!"});
        }
    } catch (error) {
        console.log(error)
    }
}

const GetUserTasks = async (req, res) => {
    const email = req.body.email;

    try {
        const data = await Task.find({taskFor: email});

        if(data.length > 0){
            res.json({msg: "User Tasks Fetched!!", d: data}); 
        }else{
            res.json({msg: "Nothing to Show!"});
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {AddNewTask, GetAllTasks, DeleteTask, TaskStatusUpdate, GetManagerTasks, GetUserTasks};