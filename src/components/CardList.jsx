"use client";
import { useSocket } from "../context/socketContext";
import Card from "./Card";
import { useEffect, useState } from "react";
import AddNewRoom from "./NewRoom";
import { emitTest, onSocket, onNewRoom } from "@/socket/room";
export default function CardList({ rooms, token }) {
  const socket = useSocket();
  const [roomList, setRoomList] = useState(rooms);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("socket connected");
    });
    onNewRoom(socket, setRoomList);
  }, [socket]);
  return (
    <div className='flex flex-wrap'>
      <AddNewRoom token={token} />
      {roomList.map((room) => {
        return <Card key={room.id} data={room} />;
      })}
    </div>
  );
}
