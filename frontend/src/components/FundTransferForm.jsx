import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFundTransfer } from '../actions/Actions';  
import 'react-toastify/dist/ReactToastify.css';

const FundTransferForm = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecipientChange = event => {
    setRecipientId(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
     dispatch(handleFundTransfer(currentUser.id, recipientId, amount));
     setRecipientId('');
     setAmount('');
  };

  return (
<div className="rounded-lg w-full max-w-md mx-auto">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Transfer Funds</h2>

  <form onSubmit={handleSubmit}>
    {/* Recipient ID Input */}
    <div>
      <label className="block text-gray-700 text-sm font-medium pb-1">Recipient ID:</label>
      <input 
        type="text" 
        value={recipientId} 
        onChange={handleRecipientChange} 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ease-in-out duration-200 text-black" 
        placeholder="Enter recipient's ID"
      />
    </div>

    {/* Amount Input */}
    <div>
      <label className="block text-sm font-medium pb-1 mt-3">Amount:</label>
      <input 
        type="number" 
        value={amount} 
        onChange={handleAmountChange} 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ease-in-out duration-200 text-black" 
        placeholder="Enter amount to transfer"
      />
    </div>

    {/* Submit Button */}
    <button 
      type="submit" 
      className="w-full mt-5 px-4 py-2 text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
    >
      Transfer
    </button>
  </form>
</div>

  );
};

export default FundTransferForm;
