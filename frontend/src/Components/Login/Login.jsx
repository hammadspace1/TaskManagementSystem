import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [data, setData] = useState({});

    const navigate = useNavigate();

    const handleInput = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const Submit = () => {
        if(data.email !== undefined && data.password !== undefined && data.role !== undefined){
            axios.post("http://localhost:5000/login", {data}).then((res) => {
                alert(res.data.msg);
                if(data.role === "Admin"){
                    sessionStorage.setItem("name", res.data.d.name);
                    sessionStorage.setItem("email", res.data.d.email);
                    sessionStorage.setItem("role", res.data.d.role);
                    sessionStorage.setItem("isLoggedIn", true);
                    navigate("/admin");
                }else if(data.role === "Manager"){
                    sessionStorage.setItem("name", res.data.d.name);
                    sessionStorage.setItem("email", res.data.d.email);
                    sessionStorage.setItem("role", res.data.d.role);
                    sessionStorage.setItem("isLoggedIn", true);
                    navigate("/manager");
                }else if(data.role === "User"){
                    sessionStorage.setItem("name", res.data.d.name);
                    sessionStorage.setItem("email", res.data.d.email);
                    sessionStorage.setItem("role", res.data.d.role);
                    sessionStorage.setItem("isLoggedIn", true);
                    navigate("/user");
                }
            }).catch((error) => {
                console.log(error)
            })
        }else{
            alert("Please Fill All the Fields!");
        }
    }

    return(
        <div className="w-full">
            <div className="w-full px-5 md:px-0 md:w-[550px] md:ml-[480px] mt-2 items-center md:border-2 md:shadow-2xl md:border-[#E7E7E7] md:rounded-[30px]">
                 <h1 className="text-[#FFB606] text-center mt-5 text-[3rem] font-bold font-serif">Login</h1>
                 <select name="role" id="role" onChange={handleInput} className="w-full md:w-[26rem] h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5" >
                    <option  >Login as:</option>
                    <option value="Admin" >Login as: Admin</option>
                    <option value="Manager">Login as: Manager</option>
                    <option value="User">Login as: User</option>
                </select>              
                 <input name="email" id="email" onChange={handleInput}  className="w-full md:w-[26rem] h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5" type="Email" placeholder="Enter Email" />
                 <input name="password" id="password" onChange={handleInput}  className="w-full md:w-[26rem] h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5" type="password" placeholder="Enter Password" />
                 <button onClick={Submit} className="w-[13rem] h-9 md:ml-[4rem] bg-[#FFB606] hover:bg-[#c8aa62] border-2 border-[#E7E7E7] rounded-[20px] mt-11 mb-11 px-5 font-serif font-semibold">Login</button>
            </div>

        </div>
    )
}

export default Login;