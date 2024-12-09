import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommentsAction, postCommentAction } from "../actions/Actions";

const Comment = () => {
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.message.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(currentUser.id));
  }, [currentUser.id, dispatch]);

  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postCommentAction(currentUser.id, newMessage));
    dispatch(fetchCommentsAction(currentUser.id));
    setNewMessage("");
  };

  return (
    <div className="p-6 drop-shadow-2xl bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 rounded-3xl h-[calc(100vh-40px)] mx-auto shadow-lg mt-5 mr-5">

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-6">
        {/* Textarea */}
        <textarea
          value={newMessage}
          onChange={handleMessageChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
          placeholder="Write a new message..."
          rows="10"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Submit Message
        </button>
      </form>

      {/* Message List */}
      <ul className="space-y-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className="border p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
