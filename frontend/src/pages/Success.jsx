import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TransferSuccessPage = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Transfer Successful!</h1>

        <p className=" text-sm ">Your transfer was successful.</p>
        <p className="mt-1 text-base font-semibold text-gray-500 ">Current Balance: ₹{balance}</p>
        <div className="flex justify-center items-center mt-8">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccessPage;
