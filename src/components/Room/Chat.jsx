"use client";
import { useSocket } from "@/context/socketContext";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/Room/ui/card";
import { Input } from "@/components/Room/ui/input";
import Message from "./ui/Message";

export function ChatingArea({ roomId, user }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("user:joinRoom", { roomId, user });
    socket.on("message:receive", ({ message, user }) => {
      setMessages((messages) => [...messages, { message, user }]);
    });

    return () => {
      socket.off("message:receive");
    };
  }, [socket]);

  const submitMessage = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") return;
      const message = e.target.value;
      socket.emit("message:send", { message, user, roomId });
      e.target.value = "";
    }
  };
  return (
    <div className="col-span-3 flex flex-col gap-4 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold">Chat</h2>
      <Card className="h-4/6 overflow-y-scroll" ref={messagesContainerRef}>
        <div className="p-4 space-y-2 overflow-x-hidden">
          {messages.map((message, id) => (
            <Message
              key={id}
              user={{ name: message.user.name, imageUrl: message.user.image }}
              message={message.message}
            />
          ))}
        </div>
      </Card>
      <div className="mt-2">
        <Input
          className="w-full"
          placeholder="Type a message..."
          onKeyDown={submitMessage}
        />
      </div>
    </div>
  );
}
