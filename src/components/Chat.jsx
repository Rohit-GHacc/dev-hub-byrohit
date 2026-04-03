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
  const bottomRef = useRef(null);
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
    socketRef.current.on(
      "messageReceived",
      ({ senderId, firstName, lastName, text }) => {
        //   console.log(firstName + " : " + text);
        setMessages((messages) => [
          ...messages,
          { senderId, firstName, lastName, text },
        ]);
      },
    );
    // when the component unmounts, return statement is executed
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, [messages]);
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
    <div className="min-h-[90vh] bg-linear-to-br from-blue-50 to-gray-100 flex justify-center px-2 sm:px-4 py-4">
      <div className="w-full max-w-2xl h-[85vh] bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-200">
          <Link
            to="/connections"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            ←
          </Link>

          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-800">Chat</h2>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" >
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm
              ${
                isMe
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold mb-1 text-gray-500">
                      {msg.firstName}
                    </p>
                  )}
                  <p className = 'whitespace-pre-wrap'>{msg.text}</p>
                </div>
              </div>
            );
            
          })}
          <div ref={bottomRef} />
          
        </div>
        {/* Input */}
        <div className="border-t border-gray-200 p-3 flex items-center gap-2">
          <textarea
            rows={1}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // prevent newline
                if (newMessage.trim()) {
                  sendMessage();
                }
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
