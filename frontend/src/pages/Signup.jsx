import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });
  const [error,setError] = useState(false);
  const { firstname, lastname, username, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Perform form submission logic here, e.g., sending data to backend
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup',formData)
      const {token} = response.data;
      console.log(token)
      localStorage.setItem('token', token);
      // Redirect to dashboard or any other protected route
      navigate('/dashboard');
    }catch(e){
      setError(true);
      console.log("Try again");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <div className="mb-4 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {error && <p className=' text-red-600 text-sm flex justify-center mb-2'> Signup failed. Try Again.</p>}
          <div className="flex items-center justify-center mb-2">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="flex justify-center">
          <div className="flex text-sm justify-center pr-1">Already have an account?</div>
          <div className="flex text-sm justify-center">
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
