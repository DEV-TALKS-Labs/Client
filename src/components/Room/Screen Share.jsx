"use client";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socketContext";

export function SharingArea({ roomId, user }) {
  const socket = useSocket();
  const { push } = useRouter();

  useEffect(() => {
    if (!socket) return;
    socket.on("user:shareScreen", (roomId) => {
      console.log(roomId);
    });
  }, [socket]);
  const leaveRoom = async () => {
    socket.emit("user:leaveRoom", { roomId, userId: user.id });
    push("/");
  };
  return (
    <div className="col-span-2 flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Screen Sharing</h2>
      <Card className="h-3/5">
        <div className="p-4"></div>
      </Card>
      <div className="flex gap-4">
        <Button variant="outline">
          <IconVideocamera className="h-6 w-6 mr-2" />
          Share Screen
        </Button>
        <Button variant="outline">
          <IconCamera className="h-6 w-6 mr-2" />
          Camera
        </Button>
      </div>
      <button
        onClick={leaveRoom}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        Stop Sharing
      </button>
    </div>
  );
}

function IconVideocamera(props) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconCamera(props) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
