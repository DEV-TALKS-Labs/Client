"use client";
import { useSocket } from "../context/socketContext";
import Card from "./Card";
import { useEffect } from "react";
import AddNewRoom from "./NewRoom";
import { emitTest, onSocket } from "@/socket/room";
export default function CardList({ rooms, token }) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("socket connected");
    });
    onSocket(socket);
    emitTest(socket, "this is data for test");
  }, [socket]);
  return (
    <div className="flex flex-wrap">
      <AddNewRoom token={token} />
      {rooms.map((room) => {
        return <Card key={room.id} title={room.title} />;
      })}
    </div>
  );
}
