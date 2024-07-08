import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const [text] = useTypewriter({
    words: ["Welcome to LoosoTreat!"],
    loop: true,
  });

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/create-room`);
      console.log(response);
      navigate(`/lobby/${response.data.room.id}`);
      const ownerId = localStorage.getItem("userId");
      localStorage.setItem("ownerId", ownerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/join-room`, {
        roomId,
        userId: localStorage.getItem("userId"),
      });
      console.log(response);
      setRoomId("");
      navigate(`/lobby/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-12 py-14 rounded-lg shadow-lg text-center border-2 border-white md:w-1/3 w-full mx-2 md:mx-0 ">
        <div className="text-3xl font-bold mb-12 h-10 text-wrap w-full">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">{text}</span>
        </div>
        <div className="space-y-6">
          <button
            className="w-full py-3 text-2xl font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
          <div className="space-y-4">
            <label htmlFor="join" className="block text-lg font-bold">
              Join Room
            </label>
            <input
              type="text"
              id="join"
              placeholder="Enter Room ID"
              className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-purple-500"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button
              className="w-full py-3 text-2xl font-bold bg-slate-700 text-white rounded-lg hover:bg-slate-800"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
