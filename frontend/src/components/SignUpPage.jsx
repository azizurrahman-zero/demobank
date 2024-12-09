import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, setToken } from '../actions/Actions';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const user = {
      firstname: firstname,
      lastname: lastname,
      email,
      password,
      role: 'USER'
    };

    dispatch(signUp(user, navigate))
      .then((response) => {
        const jwtToken = response.headers.authorization;
        dispatch(setToken(jwtToken));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 p-6 md:p-10 bg-white shadow-xl rounded-lg transform transition-all duration-500 hover:scale-105">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center animate__animated animate__fadeIn">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-4 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-4 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-4 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-6 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-600 mt-4 text-center">
            Have an account?{' '}
            <a href="/" className="text-blue-500 font-semibold hover:underline transition-all duration-300">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
