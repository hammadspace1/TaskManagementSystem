import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalState } from '../../Components/global/GlobalStateProvider';

const Header = () => {

    const [log, setLog] = useState(true);
    const [logValue, setLogValue] = useState("");
    const [open, setOpen] = useState(false);
    const { globalState, setGlobalState } = useGlobalState();

    useEffect(() => {
        if(log){
            setLogValue("Logout");
        }else{
            setLogValue("Login")
            sessionStorage.clear();
        }
    },[log])

    const location = useLocation();


    return(
        <div>
            <div className="hidden md:flex w-full  justify-between bg-[#002147] md:px-[12rem] mb-10 ">
                <div className="w-full md:w-[25rem] bg-[#FFB606] text-[#002147] text-[1.4rem] font-serif font-semibold py-5 px-8">
                    Task Management System
                </div>
            </div>
            <div className="flex md:hidden w-full  justify-between bg-[#002147] md:px-[12rem] mb-10 ">
                <div className="w-full md:w-[25rem] flex justify-between bg-[#FFB606] text-[#002147] text-[1.4rem] font-serif font-semibold py-5 px-8">
                    <div>Task Management System</div>
                    <button onClick={() => setGlobalState(!globalState)} className="text-[2rem] text-black border-2 border-black rounded-full h-[40px] w-[35px]"><ion-icon name={globalState ? "close" : "menu"}></ion-icon></button>
                </div>
            </div>
        </div>
    )
}

export default Header;