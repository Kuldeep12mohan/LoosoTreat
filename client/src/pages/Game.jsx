import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant.js";

const Game = () => {
  const [number, setNumber] = useState(0);
  const [countdown, setCountdown] = useState(60); // Countdown timer in seconds
  const [winner, setWinner] = useState();
  const [showWinner, setShowWinner] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const sendNum = async () => {
    const res = await axios.post(`${BACKEND_URL}/send-num`, {
      id: localStorage.getItem("userId"),
      number,
    });
    setNumber(0);
    console.log(res);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        navigate("/game"); // Navigate to '/game' when countdown ends
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]); // Include navigate in the dependency array

  const evaluate = async () => {
    const res = await axios.get(
      `${BACKEND_URL}/return-user/${localStorage.getItem("roomId")}`
    );
    console.log(res);
    setWinner(res.data.user.name);
    setShowWinner(true);
  };

  return (
    <div className="flex justify-center h-screen items-center relative">
      <div>
        <div className="text-white text-center font-bold mb-4 absolute top-2">
          <p>Time remaining: {countdown} seconds</p>
        </div>

        <label htmlFor="number" className="text-white">
          Enter your guess number between 0 and 100
        </label>
        <input
          type="number"
          name="number"
          id="number"
          placeholder="enter your guess"
          className="border-2 py-2 px-4 mx-4 rounded-lg"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          className="py-2 px-4 font-semibold bg-slate-600 text-white"
          onClick={sendNum}
        >
          Submit
        </button>
        <button
          className="py-2 px-4 font-semibold bg-slate-600 text-white mx-2"
          onClick={evaluate}
        >
          Evaluate
        </button>
        {showWinner && <div>{winner} is the winner</div>}
      </div>
    </div>
  );
};

export default Game;
