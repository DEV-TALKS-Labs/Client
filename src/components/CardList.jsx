"use client";
import { useSocket } from "../context/socketContext";
import Card from "./Card";
import { useEffect, useState } from "react";
import AddNewRoom from "./NewRoom";
import { onDeleteRoom, onNewRoom, onRedirect } from "@/socket/room";
import { useRouter } from "next/navigation";

export default function CardList({ rooms, token, setRoomList }) {
  const socket = useSocket();
  const { push } = useRouter();

  useEffect(() => {
    if (!socket) return;
    onNewRoom(socket, setRoomList);
    onDeleteRoom(socket, setRoomList);
    onRedirect(socket, push);
    return () => {
      socket.off("room:new");
      socket.off("room:delete");
      socket.off("user:redirect");
    };
  }, [socket]);
  return (
    <div className="flex flex-wrap max-h-[60vh] overflow-y-auto">
      <AddNewRoom token={token} />
      {rooms.map((room, idx) => {
        return <Card key={idx} data={room} />;
      })}
    </div>
  );
}
