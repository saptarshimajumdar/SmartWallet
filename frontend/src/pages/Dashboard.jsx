import { useEffect, useState } from "react";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard=  ()=>{
    const navigate = useNavigate();
    const [userinfo, setUserinfo]=useState({});
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/');
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/about',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then(response =>{
            setUserinfo(response.data);
        })
    },[])

    

    return( <div className="">
        <div className="flex justify-between items-center bg-blue-900 text-white px-6 py-4 shadow-md ">
                <div className="text-2xl font-bold">SmartWallet</div>
                <div className="text-sm">Hello, {userinfo.firstname}</div>
        </div>

        <div className="p-4">
            <div className="text-2xl font-bold  ">{userinfo.firstname} {userinfo.lastname}  </div>
            <div className="text-lg  text-gray-500 font-semibold mb-6 "> Balance: ₹{userinfo.balance}  </div>
                
            <div className="mb-8 flex justify-between">
                <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={()=>{
                    navigate('/deposit');
                }}
                type="button">
                Deposit
                </button>
                <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={()=>{
                    localStorage.removeItem('token');
                    navigate('/')
                }}
                type="button">
                Signout
                </button>
            </div>

            <Users />
        </div>
        
    </div>
    )
}
export default Dashboard;