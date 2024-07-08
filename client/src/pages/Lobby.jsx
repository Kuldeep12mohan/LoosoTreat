import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { motion } from "framer-motion";

let intervalId;

const Lobby = () => {
  const [showGameRules, setShowGameRules] = useState(false);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is the admin
    if (localStorage.getItem("ownerId") === localStorage.getItem("userId")) {
      setAdmin(true);
    }
  }, []);

  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("roomId", id);
    const addMe = async () => {
      const res = await axios.post(`${BACKEND_URL}/join-room`, {
        userId: localStorage.getItem("userId"),
        roomId: id,
      });
      console.log(res);
    };

    const userFetch = async () => {
      const response = await axios.get(`${BACKEND_URL}/get-users/${id}`);
      console.log("response", response);
      setUsers(response.data.users.members);
    };

    userFetch();
    addMe();
    intervalId = setInterval(userFetch, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  const stopFetching = () => {
    clearInterval(intervalId);
    navigate("/game");
  };

  const copyRoomId = () => {
    const roomId = id;
    navigator.clipboard.writeText(roomId).then(() => {
      console.log("copied");
    });
  };
  if (showGameRules)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="w-1/2">
          <h1 className="text-2xl text-center">Game Rules</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            odit culpa autem aliquid iste tenetur, reiciendis eius facere nobis
            illum quibusdam sed accusamus vel commodi cum dolor molestias, totam
            similique! Quas ratione accusamus beatae sapiente earum dolorum?
            Aliquam harum totam laudantium, delectus voluptates magni qui
            adipisci soluta quod veritatis excepturi dolore distinctio
            consequuntur. Omnis veritatis accusamus aliquam enim, quidem cumque.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen mx-2">
      <div className="border-2 border-white py-10 px-5 md:px-10 w-full max-w-xl ">
        {admin && (
          <div className="mb-4">
            <h1 className=" text-white">
              Your room id is{" "}
              <a
                href="#"
                className="underline text-blue-500 cursor-pointer"
                onClick={copyRoomId}
              >
                {id}
              </a>
            </h1>
          </div>
        )}
        <h1 className="text-center text-xl text-white font-bold mb-4">
          Players in Lobby...
        </h1>
        <div className="border-2 border-gray-700 flex justify-center w-full h-20 items-center overflow-hidden">
          {users.map((item, index) => (
            <motion.div
              key={index}
              className="inline-block"
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <Card name={item.name} />
            </motion.div>
          ))}
        </div>
        <button
          onClick={stopFetching}
          className="py-2 px-6 bg-purple-500 font-bold text-xl text-white border-2 mt-5 w-full md:w-auto mx-auto"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Lobby;
