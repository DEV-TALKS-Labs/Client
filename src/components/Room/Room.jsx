import { ChatingArea } from "./Chat";
import { SharingArea } from "./Screen Share";
import { UsersArea } from "./Users";
import { cookies } from "next/headers";
import axios from "axios";
export async function Room({ currentRoomId }) {
  //TODO: room Users

  const joinRoom = async () => {
    if (currentRoomId === "favicon.ico") return null;
    const token = cookies().get("next-auth.session-token").value;
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/rooms/${currentRoomId}/join`,
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
      console.log("rooms", err);
      return null;
    }
  };

  const roomData = await joinRoom();

  return (
    <div className='grid h-screen grid-cols-5 gap-4'>
      <ChatingArea />
      <SharingArea />
      <UsersArea data={roomData} currentRoomId={currentRoomId} />
    </div>
  );
}