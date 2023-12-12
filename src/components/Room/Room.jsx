import { ChatingArea } from "./Chat";
import { SharingArea } from "./ScreenShare";
import { UsersArea } from "./Users";
import { cookies } from "next/headers";
import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export async function Room({ currentRoomId }) {
  //TODO: room Users

  const session = await getServerSession(options);

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

      return response.data;
    } catch (err) {
      // console.log("rooms", err);
      return null;
    }
  };

  const roomData = await joinRoom();

  return (
    <div className="grid h-[85%] max-h-[85%] grid-cols-5 gap-4 ">
      <UsersArea
        data={roomData}
        currentRoomId={currentRoomId}
        user={session.user}
      />
      <SharingArea roomId={currentRoomId} user={session.user} />
      <ChatingArea roomId={currentRoomId} user={session.user} />
    </div>
  );
}
