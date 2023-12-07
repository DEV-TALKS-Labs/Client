"use client";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { Badge } from "@/components/Room/ui/badge";
import axios from "axios";
import { useSocket } from "@/context/socketContext";
import { onUserJoined, onUserLeft } from "@/socket/user";
import { useEffect, useState } from "react";

export function UsersArea({ currentRoomId, user }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({});
  const socket = useSocket();
  const [roomUsersList, setRoomUsersList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/rooms/${currentRoomId}`, {
        data: {
          roomUsers: true,
        },
        headers: {
          "Cache-Control": "no-cache", //disable cache
        },
      })
      .then((res) => {
        setData(res.data);
        setRoomUsersList(res.data.roomUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;
    onUserJoined(socket, setRoomUsersList);
    onUserLeft(socket, setRoomUsersList);

    return () => {
      socket.off("user:joined");
      socket.off("user:left");
      socket.emit("user:leaveRoom", { currentRoomId, userId:user.id });
    };
  }, [socket]);

  const { id, hostId, coHostId } = data;

  return (
    <div className="col-span-2 flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Users</h2>
      <div className="grid gap-4 ">
        {roomUsersList?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            hostId={hostId}
            coHostId={coHostId}
          />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user, hostId, coHostId }) {
  const { id, name, imageUrl } = user;
  return (
    <Card className="rounded-full flex items-center gap-4 p-4">
      <Avatar className="h-9 w-9 rounded-full">
        <AvatarImage src={imageUrl} alt={user.name} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        {id === hostId && <Badge>Host</Badge>}
        {id === coHostId && <Badge>Co-Host</Badge>}
      </div>
      <Button size="icon" variant="ghost">
        <IconVolumeoff className="h-6 w-6" />
        <span className="sr-only">Mute {name}</span>
      </Button>
    </Card>
  );
}
function IconVolumeoff(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  );
}
