import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";

const TransactionCard = ({}) => {
    const [amount,setAmount]=useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const firstname = searchParams.get('firstname');
    const lastname = searchParams.get('lastname');
    const token=localStorage.getItem('token');
    const navigate = useNavigate();

    const handleTransfer= async ()=>{
        
        try{
            const response = await axios.post(`http://localhost:3000/api/v1/account/transfer`, {
                to: id,
                amount,
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            navigate('/success')
        }catch(error){
            console.log("Transaction Failed")
        }
            
    }
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
          
        <div className="bg-white rounded-lg shadow-md w-4/12 p-6">
            <div className="flex justify-center">
                <h2 className="text-2xl font-semibold mb-4">Transaction</h2>
            </div>
            <h2 className="text-gray-700 mb-4 text-lg font-semibold"> To: {firstname} {lastname}</h2>
            <h2 className="text-gray-700 mb-1 text-sm font-semibold"> Amount (in Rs)</h2>
            <input
                type="number"
                placeholder="Enter amount"
                onChange={(e)=>{
                    setAmount(e.target.value)
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600" onClick={handleTransfer}>
                    Initiate Transfer
                </button>           
            </div>
            
        </div>
    </div>
    
  );
};

export default TransactionCard;
