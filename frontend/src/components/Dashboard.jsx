import React, { useEffect, useState } from "react";
import FundTransferForm from "./FundTransferForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../actions/Actions";
import { toast } from "react-toastify";
import { instance as axios } from "../config/axiosConfig";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user);
  const balanceData = useSelector((state) => state.balanceData);
  const { balance, transactions } = balanceData;
  const dispatch = useDispatch();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchUserData(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleSubmitDeposit = async () => {
    try {
      const response = await axios.post("/bankingcore/deposits/request", {
        accountid: currentUser.id,
        amount: depositAmount,
      });

      if (response.status === 200) {
        toast.success(
          "Your deposit request has been submitted and is awaiting approval by an admin."
        );
        setDepositAmount("");
        setShowDepositModal(false);
      } else {
        toast.error("Error occurred while submitting deposit request.");
      }
    } catch (error) {
      console.error("Error while making deposit request:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen relative p-5 pl-0 text-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-white z-0"></div>

      <div className="flex flex-col flex-1 shadow-2xl rounded-3xl p-8 mx-auto w-full md:w-2/3 lg:w-1/2 z-10 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300">
        <div className="border-b pb-6 mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Balance</h2>
          <p className="text-6xl font-extrabold text-purple-600 mt-4">
            ${balance.toFixed(2)}
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Previous Operations
          </h2>
          {transactions.length > 0 ? (
            <ul className="space-y-6 w-4/6">
              {transactions.map((operation, index) => (
                <li
                  key={index}
                  className="p-6 bg-white shadow-lg rounded-xl flex justify-between items-center transition-transform duration-300 transform hover:scale-105"
                >
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">
                      ${operation.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(operation.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-semibold ${
                      operation.type === "DEPOSIT"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {operation.type}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No operations found.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setShowDepositModal(true)}
        className="fixed bottom-16 right-16 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-5xl flex items-center justify-center rounded-full shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition duration-300 transform hover:scale-105 focus:outline-none z-10"
      >
        <span className="font-[sans-serif] text-6xl">+</span>
      </button>

      {showDepositModal && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Make a Deposit
            </h2>
            <input
              type="text"
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-4 w-full mb-6 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSubmitDeposit}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-md hover:scale-105 transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => setShowDepositModal(false)}
                className="bg-gray-300 text-gray-800 p-4 rounded-md hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-8 right-8 w-80 p-8 bg-white rounded-xl shadow-lg z-10">
        <FundTransferForm />
      </div>
    </div>
  );
};

export default Dashboard;
