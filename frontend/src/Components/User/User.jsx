import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const User = () => {

    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');
    const check = sessionStorage.getItem('check');

    const navigate = useNavigate();

    useEffect(() => {
        if(role !=="User" && !check){
            navigate("/");
        }
    },[])

    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:5000/getUserTasks", {email}).then((res) => {
            setUserTasks(res.data.d);
        }).catch((error) => {
            console.log(error);
            console.log(email);
        })
    },[])

    const logout = () => {
        sessionStorage.clear();
        alert("Logout Successfully!");
        navigate("/");

    }


    return(
        <div className="md:w-[1528px]  h-[400px] flex m-1  ">
            <div className="hidden w-[350px] h-[550px] md:flex rounded-tl-xl rounded-bl-xl ml-[1rem] mt-[-4px] border-4 border-[#002147] bg-[#002147] text-white">
            </div>
            <div className="md:w-[1150px] h-[550px] flex-col md:rounded-tr-xl md:rounded-br-xl  mt-[-4px] ml-[-4px] border-4 border-[#FFB606] bg-[#FFB606] box-border overflow-auto">
            <div className="w-full flex justify-between md:px-[4rem] ">
                    <h1 className="font-serif font-semibold mt-7 text-[1rem] md:text-[2rem]">Admin Panel</h1>
                    <h1 className="font-serif font-semibold mt-7 md:mt-9 text-[1rem] md:text-[1.3rem]">Logged As : {name}</h1>
                    <button onClick={logout} className="font-serif font-semibold mt-7 md:border-2 border-red-600 rounded-full text-red-600 cursor-pointer hover:bg-red-600 hover:text-white md:py-2 md:px-2 text-[1rem] md:text-[1.2rem]">LogOut</button>
                </div>
                {userTasks ? (
                    <div className="md:w-[1020px] flex-col md:ml-[4rem] mt-2 items-center  rounded-[30px]">
                    <h1 className="text-[#002147]  mt-5 text-[2rem] md:text-[3rem] font-bold font-serif">Your Tasks!</h1>
                    <table className="sticky shadow-2xl font-serif border-2 m border-[#002147] md:w-[800px]">
                        <thead className="text-white">
                            <tr>
                                <th className="py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Date</th>
                                <th className="py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Title</th>
                                <th className="py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Description</th>
                                <th className="py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Assigned To</th>
                                <th className="py-3 border-r-2 border-[#002147] bg-[#002147] text-[0.5rem] md:text-[1rem]">Task Status</th>
                            </tr>
                        </thead>
                        {userTasks.map((res, index) => {

                            const date = new Date(res.date).toLocaleDateString();
                            return(
                                <tbody key={index} className="border-b-2 border-[#002147]">
                                    <tr className="bg-[#65768a] cursor-pointer duration-300">
                                        <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{date}</td>
                                        <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.title}</td>
                                        <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.discription}</td>
                                        <td className="py-3 px-1 md:px-6 border-r-2 border-[#002147] text-[0.5rem] md:text-[1rem]">{res.assignedTo}</td>
                                        <td className={`py-3 px-2 border-r-2 border-[#002147] font-bold text-[0.5rem] md:text-[1rem]  ${res.taskStatus === "To_Do" ? "text-red-500" : res.taskStatus === "In_Progress" ? "text-yellow-500" : res.taskStatus ==="Completed" ? "text-green-500 " : " "}`}>{res.taskStatus}</td>              
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    
            </div>) : (
                    <div>
                        <h1 className="text-[3rem] text-red-500 font-bold font-serif mt-10 ml-[4rem] ">No Task Found</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default User;