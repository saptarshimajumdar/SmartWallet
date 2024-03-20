import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = ()=>{
    const [users,setUsers]= useState([])
    const [filter, setFilter]= useState('');
    const token = localStorage.getItem('token');
    let debounceTimeout;
    

    function handleChange(e) {
      clearTimeout(debounceTimeout); // Clear previous debounce timeout
      debounceTimeout = setTimeout(() => {
        setFilter(e.target.value); 
      }, 300);
    }

    useEffect(()=>{
      const fetchUsers= async()=>{
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        setUsers(response.data.users);
      }
      fetchUsers();
    },[filter])

    return (
        <div>
        <div className="text-base font-bold mb-4">Users</div>
        <div className="flex mb-4">
          <input className="w-full border py-2 px-4 rounded-md" type="text" placeholder="Search users" onChange={handleChange} />
        </div>
        <div>
          {users.map((user, index) => (
            <User key={index} user={user}  />
          ))}
        </div>
      </div>
      );
 
}
const User = ({user})=>{
  const navigate =useNavigate();
  function handleTransfer(){
    navigate(`/transaction?id=${user._id}&firstname=${user.firstname}&lastname=${user.lastname}`);
  }

    return (<div className="flex justify-between pl-2 pb-1">
        <div className=""> {user.firstname} {user.lastname} </div>
        <div> 
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
              onClick={handleTransfer}
              type="button">
              Transfer
            </button>
        </div>
    </div>)
}