import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  approveDeposit,
  rejectDeposit,
  fetchPendingDeposits,
} from "../../actions/admin/adminActions";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const users = useSelector((state) => state.admin.users);
  const pendingDeposits = useSelector((state) => state.admin.pendingDeposits);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPendingDeposits());
  }, [dispatch]);
  const handleNavigateToDownloadFiles = () => {
    navigate("/download-files");
  };

  return (
    <div className="p-8 mt bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 min-h-[calc(100vh-40px)] mt-5 mr-5 mb-5 rounded-3xl">
      {pendingDeposits.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Pending Deposits:
          </h3>
          <ul className="space-y-4">
            {pendingDeposits.map((deposit) => (
              <li
                key={deposit.depositId}
                className="p-4 bg-gray-50 shadow-md rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      ${deposit.amount.toFixed(2)}
                    </p>
                    <span className="text-sm text-gray-500">
                      Deposit ID: {deposit.depositId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() =>
                        dispatch(approveDeposit(deposit.depositId))
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                      onClick={() => dispatch(rejectDeposit(deposit.depositId))}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {users.map((user) => (
          <div key={user.accountId} className="border-b-2 pb-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {user.firstname} {user.lastname}
            </h3>

            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Balance:</span> $
                {user.balance.toFixed(2)}
              </p>

              {/* Transactions */}
              {user.transactions.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Transactions:
                  </h4>
                  <ul className="pl-4 space-y-2">
                    {user.transactions.map((tx) => (
                      <li key={tx.id} className="text-gray-700">
                        <span className="font-medium">{tx.type}</span> of
                        amount: ${tx.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comments */}
              {user.comments.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Comments:
                  </h4>
                  <ul className="pl-4 space-y-2">
                    {user.comments.map((comment, index) => (
                      <li key={index} className="text-gray-600">
                        {comment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
