import { ChatingArea } from "./Chat";
import { SharingArea } from "./Screen Share";
import { UsersArea } from "./Users";
import { cookies } from "next/headers";
import axios from "axios";
export async function Room({ currentRoomId }) {
  //TODO: room Users
  console.log(currentRoomId);

  const token = cookies().get("next-auth.session-token").value;
  const body = {};
  const room = await axios.get(
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

  console.log("im here", room.data);
  return (
    <div className='grid h-screen grid-cols-5 gap-4'>
      <ChatingArea />
      <SharingArea />
      <UsersArea data={room.data} />
    </div>
  );
}
