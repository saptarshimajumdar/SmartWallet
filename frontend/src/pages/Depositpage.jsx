import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/account/deposit',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Deposit successful:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error depositing money:', error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Deposit Money</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (in Rs)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDeposit}
            type="button"
          >
            Deposit
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/dashboard')}
            type="button"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
