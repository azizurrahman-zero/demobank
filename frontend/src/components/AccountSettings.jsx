import React, { useState } from 'react';
import { instance as axios } from '../config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/Actions';

const AccountSettings = () => {
  const currentUser = useSelector(state => state.user);
  const [email, setEmail] = useState(currentUser.email);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/bankingcore/editUser/${currentUser.id}`, {
        newFirstname: firstName,
        newLastName: lastName,
        newPassword: password
      });

      if (response.status === 200) {
        const updatedUserData = response.data;
        dispatch(updateUser(updatedUserData));
      } else {
        console.error('Failed to update user data:', response);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
<div className="min-h-[calc(100vh-40px)] mt-5 mr-5 mb-5 rounded-3xl flex items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 lg:px-8">
  <div className="max-w-md w-full space-y-8 bg-white p-7 rounded-xl shadow-lg">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="sr-only">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 transform hover:scale-105"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="sr-only">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 transform hover:scale-105"
            placeholder="Last Name"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            value={email}
            disabled
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
            placeholder="Email address"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 transform hover:scale-105"
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 transform hover:scale-105"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AccountSettings;
