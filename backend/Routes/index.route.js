const express = require("express");
const { SignUp } = require("../Controllers/SignUp.controller");
const { Login } = require("../Controllers/Login.controller");
const { adminSignUp } = require("../Controllers/Admin.controller");
const { getAllUsers, DeleteUser } = require("../Controllers/User.controller");
const { getAllManagers, DeleteManager } = require("../Controllers/Manager.controller");
const { AddNewTask, GetAllTasks, DeleteTask, TaskStatusUpdate, GetManagerTasks, GetUserTasks } = require("../Controllers/Task.controller");
const auth = require("../Middlewares/auth");

const router = express.Router();

router.post("/adminSignUp", adminSignUp);
router.post("/signUp", SignUp);
router.post("/login", Login);
router.get("/getAllUsers", getAllUsers);
router.get("/getAllManagers",  getAllManagers);
router.post("/addNewTask", AddNewTask);
router.get("/getAllTasks", GetAllTasks);
router.post("/deleteTask", DeleteTask);
router.post("/taskStatusUpdate", TaskStatusUpdate);
router.post("/deleteManager", DeleteManager);
router.post("/deleteUser", DeleteUser);
router.post("/getManagerTasks", GetManagerTasks);
router.post("/getUserTasks", GetUserTasks);

module.exports = router;