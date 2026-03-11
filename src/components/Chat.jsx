import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //   console.log(targetUserId);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  // as soon as the page loads, connect to the server
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // as soon as the page loads, socket connection is made and joinChat event is emitted.
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });
    // when the component unmounts, return statement is executed
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };
  return (
    <div className="w-1/2 mx-auto my-5 h-[70vh] text-center border border-gray-600 flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-2xl"> Chat </h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg) => {
          return (
              <div className="chat chat-start" key={[msg.firstName, msg.txt].join('-')}>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
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
