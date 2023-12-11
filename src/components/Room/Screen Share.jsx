"use client";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socketContext";

export function SharingArea({ roomId, user }) {
  const socket = useSocket();
  const { push } = useRouter();
  const [sharedScreens, setSharedScreens] = useState([
    12, 4, 3,4,5,6
  ]);
  const [startIndex, setStartIndex] = useState(0);
  const [foucsedScreen, setFocusedScreen] = useState(null); // [index, userId]
  const screensPerPage = 4;
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
  const calculateGrid = () => {
    const endIndex = startIndex + screensPerPage;
    return sharedScreens.slice(startIndex, endIndex).map((screen, index) => {
      return index % 2 === 0
        ? `${index / 2 + 1} / 2`
        : `${(index - 1) / 2 + 1} / 2`;
    });
  };
  const handleScreenClick = (index) => {
    setFocusedScreen({
      //user data
      index,
      userId: sharedScreens[index],
    });
  };

  const handleNextClick = () => {
    const nextIndex = startIndex + screensPerPage;
    if (nextIndex < sharedScreens.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    console.log(startIndex);
    const prevIndex = startIndex - screensPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  return (
    <div className="col-span-2 flex flex-col gap-4 p-4 overflow-hidden relative" >
      <h2 className="text-xl font-semibold">Screen Sharing</h2>
      {foucsedScreen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 h-3/4">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-semibold">
                Screen {foucsedScreen.index + 1}
              </h3>
              <button
                onClick={() => setFocusedScreen(null)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Close
              </button>
            </div>
            <div className="flex justify-center">
              {/** Screen */}
            </div>
          </div>
        </div>
      )}
      {sharedScreens.length > 0 && (
        <div
          className={`grid grid-cols-2`}
          style={{ gridTemplateRows: calculateGrid() }}
        >
          {sharedScreens
            .slice(startIndex, startIndex + screensPerPage)
            .map((screen, index) => (
              <Card
                key={index}
                className="h-3/6 cursor-pointer rounded-full"
                onClick={() => handleScreenClick(index + startIndex)}
              >
                <div className="p-4 ">
                  <h3 className="text-lg font-semibold">
                    Screen {index + startIndex + 1}
                  </h3>
                  <p className="text-sm text-gray-500">Shared by: {screen}</p>
                  <div className="flex justify-center">
                    <div className="bg-gray-300 w-32 h-32 rounded-full">
                      {/** Screen */}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
      <div className="flex gap-4  ">
        {startIndex - screensPerPage >= 0 && (
          <Button variant="outline" onClick={handlePrevClick}>
            Prev
          </Button>
        )}
        {/* make space between prev and next button */}
        <div className="flex-grow"></div>
        {startIndex + screensPerPage < sharedScreens.length && (
          <Button variant="outline" onClick={handleNextClick}>
            Next
          </Button>
        )}
      </div>
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
        Leave Room
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
