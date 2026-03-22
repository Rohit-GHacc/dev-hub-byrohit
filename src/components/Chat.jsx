import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //   console.log(targetUserId);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  // as soon as the page loads, connect to the server
  useEffect(() => {
    if (!userId) return;
    socketRef.current = createSocketConnection();
    // as soon as the page loads, socket connection is made and joinChat event is emitted.
    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
    //   console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { senderId, firstName, lastName, text }]);
    });
    // when the component unmounts, return statement is executed
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    if (!chat?.data?.messages) return;
    // console.log(chat);
    const chatMessages = chat?.data.messages.map((msg) => {
      return {
        msgId: msg._id,
        senderId: msg.senderId._id,
        firstName: msg.senderId.firstName,
        lastName: msg.senderId.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);
  return (
    <div className="w-1/2 mx-auto my-5 h-[70vh] text-center border border-gray-600 flex flex-col">
      <div className="grid grid-cols-5 justify-around p-5 border-b border-gray-600 text-2xl">
        <Link className="text-xl cursor-pointer border rounded-full w-10" to='/connections'> {'←'} </Link>
        <h1 className="col-span-3 font-bold"> Chat </h1>
      </div>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg) => {
        //   console.log(msg.senderId, userId);
          return (
            <div
              className={`chat chat-${msg.senderId === userId ? "start" : "end"}`}
              key={msg.id}
            >
              <div className="chat-header">
                {msg.firstName + " " + msg.lastName}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-4">
        <input
          className="flex-1 px-4 py-2 border border-gray-500 rounded-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></input>
        <button
          className="btn btn-primary cursor-pointer rounded-full"
          onClick={sendMessage}
        >
          {" "}
          Send{" "}
        </button>
      </div>
    </div>
  );
};

export default Chat;
