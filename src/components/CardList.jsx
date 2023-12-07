"use client";
import { useSocket } from "../context/socketContext";
import Card from "./Card";
import { useEffect, useState } from "react";
import AddNewRoom from "./NewRoom";
import { onNewRoom } from "@/socket/room";
// import { useRouter }from "next/router";
import {useRouter} from "next/navigation";
export default function CardList({ rooms, token }) {
  const socket = useSocket();
  const [roomList, setRoomList] = useState(rooms);
  const {push} = useRouter();

  useEffect(() => {
    if (!socket) return;
    // socket.on("room:new", (room) => {
    //   setRoomList((prev) => [...prev, room.body]);
    //   push(`/${room.body.id}`);
    // });
    onNewRoom(socket, setRoomList);
  }, [socket]);
  return (
    <div className='flex flex-wrap'>
      <AddNewRoom token={token} />
      {roomList.map((room, idx) => {
        return <Card key={idx} data={room} />;
      })}
    </div>
  );
}
