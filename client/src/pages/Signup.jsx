import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const sendReq = async () => {
    setLoading(true)
    const res = await axios.post(`${BACKEND_URL}/signup`, {
      name,
    });
    console.log(res);
    localStorage.setItem("userId",res.data.user.id);
    setLoading(false)
    navigate("/home")
  };
  return (
    <div className="h-screen items-center flex justify-center">
      <div className="border-2 py-10 px-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
          className="border-2 py-2 px-2 mx-4 rounded-lg"
        />
        
        <button
          className="py-2 px-4 bg-slate-700 text-white font-bold text-1xl rounded-lg"
          onClick={sendReq}
        >
          {loading?"Loading...":"Submit"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
