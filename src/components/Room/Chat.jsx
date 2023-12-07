"use client";
import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";
import { Card } from "@/components/Room/ui/card";
import { Input } from "@/components/Room/ui/input";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";

export function ChatingArea({ roomId, user }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("user:joinRoom", roomId);
    socket.on("message:receive", ({message, user}) => {
      setMessages((messages) => [...messages, {message, user}]);
    });

    socket.on("user:left", (roomId) => {
      console.log(roomId);
    });
    // return () => {
    //   socket.emit("user:leaveRoom", {roomId});
    // };
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
    <div className="col-span-1 flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Chat</h2>
      <Card className="h-4/6 overflow-y-auto">
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

function Message({ user, message }) {
  const { name, imageUrl } = user;
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6 rounded-full">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold whitespace-nowrap">{name}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
