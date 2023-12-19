import { ChatingArea } from "./Chat";
import { SharingArea } from "./ScreenShare";
import { UsersArea } from "./Users";
import { cookies } from "next/headers";
import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { useSocket } from "@/context/socketContext";

export async function Room({ currentRoomId }) {
  //TODO: room Users


  // const socket = useSocket();
  const session = await getServerSession(options);
  function leaveRoom (){
    // socket.emit("user:leaveRoom", {
    //   currentRoomId,
    //   userId: session.user.id,
    // });
    // socket.emit("peer:leave", { currentRoomId, streamId: stream?.id });
    console.log(session);

  }
  let token;
  const joinRoom = async () => {
    if (currentRoomId === "favicon.ico") return null;
    token = cookies().get("next-auth.session-token").value;
    try {
      const response = await axios.patch(
        `${process.env.SERVER_API_URL}rooms/${currentRoomId}/join`,
        {
          roomUsers: true,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Cache-Control": "no-cache", //disable cache
          },
        }
      );
      return (
        <div className="grid h-[83vh] grid-cols-10 gap-4 ">
          <SharingArea roomId={currentRoomId} user={session.user} />
          <ChatingArea roomId={currentRoomId} user={session.user} />
        </div>
      );
    } catch (err) {
      const message = err.response.data.server;
      // cant join room
      return (
        <div className="h-[83vh] gap-4 flex items-center justify-center flex-col">
          <h1 className="text-center text-2xl font-bold text-red-400 mb-4">
            {message} for now join another room then try again
          </h1>
          {/* TODO */}
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Leave Room
          </button> */}
        </div>
      );
    }
  };

  return await joinRoom();
}
