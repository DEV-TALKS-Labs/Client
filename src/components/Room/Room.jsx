import { ChatingArea } from "./Chat";
import { SharingArea } from "./Screen Share";
import { UsersArea } from "./Users";
import { cookies } from "next/headers";
import axios from "axios";
export async function Room({ currentRoomId }) {
  //TODO: room Users

  const fetchData = async () => {
    if (currentRoomId === "favicon.ico") return null;
    const token = cookies().get("next-auth.session-token").value;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/rooms/${currentRoomId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
          data: {
            roomUsers: true,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log("rooms", err);
      return null;
    }
  };

  const roomData = await fetchData();

  return (
    <div className='grid h-screen grid-cols-5 gap-4'>
      <ChatingArea />
      <SharingArea />
      <UsersArea data={roomData} />
    </div>
  );
}
