import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useGlobalState } from '../../Components/global/GlobalStateProvider';

const Admin = () => {

    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');
    const check = sessionStorage.getItem('check');

    const navigate = useNavigate();

    useEffect(() => {
        if(role !=="Admin" && !check){
            navigate("/");
        }
    },[])

    

    const [roleData, setRoleData] = useState("addNewTask");
    const [taskData, setTaskData] = useState({});
    const [dataE, setDataE] = useState({});
    const [allManagers, setAllManagers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const { globalState, setGlobalState } = useGlobalState();

    const handleTaskUpdator = (e) => {
        setTaskStatus({
            ...taskStatus, [e.target.name]: e.target.value
        })
    }

    const taskUpdator = (e) => {
        axios.post("http://localhost:5000/taskStatusUpdate", {taskStatus, res: e}).then((res) => {
            alert(res.data.msg);
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteUser = (e) => {
        axios.post("http://localhost:5000/deleteUser", {e}).then((res) => {
            alert(res.data.msg);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getAllUsers").then((res) => {
            setAllUsers(res.data.d);
        }).catch((error) => {
            console.log(error)
        })
    },[deleteUser])

    const deleteManager = (e) => {
        axios.post("http://localhost:5000/deleteManager", {e}).then((res) => {
            alert(res.data.msg);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getAllManagers").then((res) => {
            setAllManagers(res.data.d);
        }).catch((error) => {
            console.log(error);
        })
    },[deleteManager])

    const deleteTask = (e) => {
        axios.post("http://localhost:5000/deleteTask",{e}).then((res) => {
            alert(res.data.msg);
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getAllTasks").then((res) => {
            setAllTasks(res.data.d);
        }).catch((error) => {
            console.log(error);
        })
    },[deleteTask, taskUpdator])

    

    const handleTInput = (e) => {
        setTaskData({
            ...taskData, [e.target.name]: e.target.value
        })
    }

    const handleInputE = (e) => {
        setDataE({
            ...dataE, [e.target.name]: e.target.value
        })
    }

    const logout = () => {
        sessionStorage.clear();
        alert("Logout Successfully!");
        navigate("/");

    }
    


    const submitTask = () => {
        if(taskData.title !== undefined && taskData.discription !== undefined && taskData.assignedTo !== undefined && taskData.taskFor !== undefined ){
            axios.post('http://localhost:5000/addNewTask', {taskData}).then((res) => {
                alert(res.data.msg)
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }else{
            alert("Please Fill All the Fields!")
        }
    }

    const submitE = () => {
        if(dataE.name !== undefined && dataE.email !== undefined && dataE.role !== undefined && dataE.password !== undefined ){
            axios.post('http://localhost:5000/signUp', {dataE}).then((res) => {
                alert(res.data.msg)
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }else{
            alert("Please Fill All the Empty Fields!")
        }
    }

    const addNewTask = () => {
        setRoleData("addNewTask")
        setGlobalState(flase);
    }
    const viewAllTasks = () => {
        setRoleData("viewAllTasks")
        setGlobalState(false);
    }
    const addNewEmployee = () => {
        setRoleData("addNewEmployee")
        setGlobalState(false);
    }
    const viewAllManagers = () => {
        setRoleData("viewAllManagers")
        setGlobalState(false);
    }
    const viewAllUsers = () => {
        setRoleData("viewAllUsers")
        setGlobalState(false)
    }

    return(
        <div className="w-full md:w-[1528px]  h-[400px] flex m-1  ">
            <div className=" hidden w-[350px] h-[550px] md:flex rounded-tl-xl rounded-bl-xl ml-[1rem] mt-[-4px] border-4 border-[#002147] bg-[#002147] text-white">
            <ul className=" mt-10 leading-[4rem]">
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "addNewTask" ? "text-[#FFB606]" : " "}`}><button onClick={addNewTask}>Add New Task</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllTasks" ? "text-[#FFB606]" : " "}`}><button onClick={viewAllTasks}>View All Tasks</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "addNewEmployee" ? "text-[#FFB606]" : " "}`}><button onClick={addNewEmployee}>Add New Employee</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllManagers" ? "text-[#FFB606]" : " "}`}><button onClick={viewAllManagers}>View All Managers</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllUsers" ? "text-[#FFB606]" : " "}`}><button onClick={viewAllUsers}>View All Users</button></li>
                </ul>
            </div>
            <div className={` md:hidden w-[200%] h-[550px] md:rounded-tl-xl md:rounded-bl-xl md:ml-[1rem] mt-[-4px] border-4 border-[#002147] bg-[#002147] text-white ${!globalState ? " hidden" : "block"}`}>
            <ul className=" mt-10 leading-[4rem]">
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "addNewTask" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setRoleData("addNewTask"))}>Add New Task</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllTasks" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setRoleData("viewAllTasks"))}>View All Tasks</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "addNewEmployee" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setRoleData("addNewEmployee"))}>Add New Employee</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllManagers" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setRoleData("viewAllManagers"))}>View All Managers</button></li>
                    <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] ml-10 ${roleData == "viewAllUsers" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setRoleData("viewAllUsers"))}>View All Users</button></li>
                </ul>
            </div>
            <div className="w-full md:w-[1150px] h-[550px] flex-col md:rounded-tr-xl md:rounded-br-xl  mt-[-4px] md:ml-[-4px] border-4 border-[#FFB606] bg-[#FFB606] box-border overflow-auto">
                <div className="w-full flex justify-between md:px-[4rem] ">
                    <h1 className="font-serif font-semibold mt-7 text-[1rem] md:text-[2rem]">Admin Panel</h1>
                    <h1 className="font-serif font-semibold mt-7 md:mt-9 text-[1rem] md:text-[1.3rem]">Logged As : {name}</h1>
                    <button onClick={logout} className="font-serif font-semibold mt-7 md:border-2 border-red-600 rounded-full text-red-600 cursor-pointer hover:bg-red-600 hover:text-white md:py-2 md:px-2 text-[1rem] md:text-[1.2rem]">LogOut</button>
                </div>
                {roleData === "addNewTask" && (
                    <div className="w-full md:w-[1020px] flex-col md:ml-[4rem] mt-0 md:mt-2 mb-10 md:mb-0 items-center  rounded-[30px]">
                        <h1 className="text-[#002147] mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">Add New Task!</h1>
                        <div className=" flex-wrap md:flex px-5 md:px-0">
                            <div className="flex flex-col ">
                                <input name="title" id="title" onChange={handleTInput}  className="w-full md:w-[26rem] h-10 md:h-[4.5rem] border-2 border-white text-[#002147] rounded-[5px] mt-8 px-5" type="text" placeholder="Enter Task Title" />
                                <select name="assignedTo" id="assignedTo" onChange={handleTInput}  className="w-full md:w-[26rem] h-10 md:h-[4.5rem] border-2 border-white text-[#002147] rounded-[5px] mt-[1rem] px-5">
                                    <option >Assigned To:</option>
                                    {allManagers.map((res,index) => (
                                        <option value={res.email} key={index}>{res.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{res.email}</option>
                                    ))}
                                </select>
                                <select name="taskFor" id="taskFor" onChange={handleTInput}  className="w-full md:w-[26rem] h-10 md:h-[4.5rem] border-2 border-white text-[#002147] rounded-[5px] mt-[1rem] px-5">
                                    <option >For User :</option>
                                    {allUsers.map((res,index) => (
                                        <option value={res.email} key={index}>{res.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{res.email}</option>
                                    ))}
                                </select>
                            </div>
                            <textarea name="discription" id="discription" onChange={handleTInput}  className="w-full md:w-[26rem] h-[15.5rem] border-2 border-white text-[#002147] rounded-[5px] md:ml-[1rem] mt-8 px-5" type="text" placeholder="Enter Task Discription" />
                        </div>
                        <button onClick={submitTask}  className="w-[13rem] h-9  hover:bg-[#c8aa62] border-2 border-[#002147] bg-[#002147] text-white rounded-[5px] mt-4 ml-5 md:ml-0 mb-4 px-5 font-serif font-semibold">Post</button>
                    </div>
                )}
                {roleData === "viewAllTasks" && (
                    allTasks ? (
                    <div className="w-full md:w-[1020px] flex-col md:ml-[4rem] mt-2 items-center  rounded-[30px]">
                    <h1 className="text-[#002147]  mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">All Tasks!</h1>
                    <table className="shadow-2xl font-serif border-2 my-10 border-[#002147] w-full md:w-[800px]">
                        <thead className="text-white">
                            <tr>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Date</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Title</th>
                                <th className="py-0 hidden md:block md:py-3 border-r-2 border-[#002147] bg-[#002147]">Description</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Assigned To</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] hidden md:block bg-[#002147] text-[0.5rem] md:text-[1rem]">Task For</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Status</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Update Status</th>
                                <th className="py-0 md:py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Delete</th>
                            </tr>
                        </thead>
                        {allTasks.map((res, index) => {

                            const date = new Date(res.date).toLocaleDateString();
                            return(
                                <tbody key={index} className="border-b-2 border-[#002147]">
                                    <tr className="bg-[#65768a] cursor-pointer duration-300">
                                        <td className="py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{date}</td>
                                        <td className="py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.title}</td>
                                        <td className="py-0 md:py-3 px-1 hidden md:block md:px-6 border-r-2 border-[#002147]">{res.discription}</td>
                                        <td className="py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.assignedTo}</td>
                                        <td className="hidden md:table-cell py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.taskFor}</td>
                                        <td className={`py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem] font-bold ${res.taskStatus === "To_Do" ? "text-red-500" : res.taskStatus === "In_Progress" ? "text-yellow-500" : res.taskStatus ==="Completed" ? "text-green-500 " : " "}`}>{res.taskStatus}</td>
                                        <td className="py-0 md:py-3 px-1 md:px-2 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">
                                            <div className="flex">
                                                <select name="taskStatus" id="taskStatus" onChange={handleTaskUpdator} className="w-[20px] rounded-full bg-[#728eaf]" >
                                                    <option value="To_Do">To do</option>
                                                    <option value="In_Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <button onClick={() => taskUpdator(res)} className="border-2 border-green-500 bg-green-500 rounded-full text-white md:ml-4 py-4 md:px-5 hover:bg-green-700">Update</button>
                                            </div>
                                        </td>
                                        <td className="md:py-3 md:px-2 border-r-2 border-[#002147]"><button onClick={() => (deleteTask(res))} className="border-2 border-red-500 bg-red-500 rounded-full text-white py-2 md:py-4 px-0 md:px-5 hover:bg-red-700">Delete</button></td>
                                        
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    
                </div> ) : (
                    <div>
                    <h1 className="text-[3rem] text-red-500 font-bold font-serif mt-10 ml-[4rem] ">No Manger Found</h1>
                </div>
                )
                )}
                {roleData === "addNewEmployee" && (
                    <div className="w-full md:w-[1020px] flex flex-col md:ml-[4rem] px-5 md:px-0 mt-0 md:mt-2 mb-10 md:mb-0  rounded-[30px]">
                        <h1 className="text-[#002147] mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">Add New Employee!</h1>
                        <input name="name" id="name" onChange={handleInputE}  className="w-full md:w-[26rem] h-10 border-2 border-white text-[#002147] rounded-[5px] mt-8 px-5" type="text" placeholder="Enter Employee Name" />
                        <input name="email" id="email" onChange={handleInputE}  className="w-full md:w-[26rem] h-10 border-2 border-white text-[#002147] rounded-[5px] mt-8 px-5" type="email" placeholder="Enter Employee Email" />
                        <select name="role" id="role" onChange={handleInputE}  className="w-full md:w-[26rem] h-10 border-2 border-white text-[#002147] rounded-[5px] mt-8 px-5">
                            <option>SignUp as:</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </select>
                        <input name="password" id="password" onChange={handleInputE}  className="w-full md:w-[26rem] h-10  border-2 border-white text-[#002147] rounded-[5px] mt-8 px-5" type="password" placeholder="Enter Password" />
                        <button onClick={submitE}  className="w-[13rem] h-9  hover:bg-[#c8aa62] border-2 border-[#002147] bg-[#002147] text-white rounded-[5px] mt-4 ml-0 md:ml-0 mb-4 px-5 font-serif font-semibold">Add</button>
                    </div>
                )}
                {roleData === "viewAllManagers" && (
                    allManagers ? (
                    <div className="w-full md:w-[1020px] flex-col md:ml-[4rem] mt-2 items-center  rounded-[30px]">
                        <h1 className="text-[#002147]  mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">All Managers!</h1>
                        <table className="sticky shadow-2xl font-serif border-2 my-10 border-[#002147] md:w-[800px]">
                            <thead className="text-white">
                                <tr>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Joining Date</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Name</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Email</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Delete Manager</th>
                                </tr>
                            </thead>
                            {allManagers.map((res, index) => {

                                const date = new Date(res.date).toLocaleDateString();
                                return(
                                    <tbody key={index} className="border-b-2 border-[#002147]">
                                        <tr className="bg-[#65768a] cursor-pointer duration-300">
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{date}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{res.name}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{res.email}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]"><button onClick={() => (deleteManager(res))} className="border-2 border-red-500 bg-red-500 rounded-full text-white py-4 px-5 hover:bg-red-700">Delete</button></td>       
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                        
                    </div>) : (
                    <div>
                        <h1 className="text-[3rem] text-red-500 font-bold font-serif mt-10 ml-[4rem] ">No Manger Found</h1>
                    </div>)
                )}
                {roleData === "viewAllUsers" &&  (
                    allUsers ? (
                    <div className="md:w-[1020px] flex-col md:ml-[4rem] mt-2   rounded-[30px]">
                        <h1 className="text-[#002147]  mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">All Users!</h1>
                        <table className="sticky shadow-2xl font-serif border-2 my-10 border-[#002147] md:w-[800px]">
                            <thead className="text-white">
                                <tr>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Joining Date</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Name</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Email</th>
                                    <th className="py-3 border-r-2 border-[#002147] bg-[#002147]">Delete User</th>
                                </tr>
                            </thead>
                            {allUsers.map((res, index) => {

                                const date = new Date(res.date).toLocaleDateString();
                                return(
                                    <tbody key={index} className="border-b-2 border-[#002147]">
                                        <tr className="bg-[#65768a] cursor-pointer duration-300">
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{date}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{res.name}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]">{res.email}</td>
                                            <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147]"><button onClick={() => (deleteUser(res))} className="border-2 border-red-500 bg-red-500 rounded-full text-white py-4 px-4 hover:bg-red-700">Delete</button></td>       
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                        
                    </div> ) : (
                    <div>
                        <h1 className="text-[3rem] text-red-500 font-bold font-serif mt-10 ml-[4rem] ">No User Found</h1>
                    </div>)
                )}

            </div>

        </div>
    )
}

export default Admin;