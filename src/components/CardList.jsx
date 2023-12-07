"use client";
import { useSocket } from "../context/socketContext";
import Card from "./Card";
import { useEffect, useState } from "react";
import AddNewRoom from "./NewRoom";
import { onDeleteRoom, onNewRoom, onRedirect } from "@/socket/room";
import { useRouter } from "next/navigation";

export default function CardList({ rooms, token }) {
  const socket = useSocket();
  const [roomList, setRoomList] = useState(rooms);
  const { push } = useRouter();

  useEffect(() => {
    if (!socket) return;
    onNewRoom(socket, setRoomList);
    onDeleteRoom(socket, setRoomList);
    onRedirect(socket, push);
  }, [socket]);
  return (
    <div className="flex flex-wrap">
      <AddNewRoom token={token} />
      {roomList.map((room, idx) => {
        return <Card key={idx} data={room} />;
      })}
    </div>
  );
}
