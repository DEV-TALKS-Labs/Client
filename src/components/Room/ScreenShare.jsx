"use client";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socketContext";
import { onUserJoined, onUserLeft } from "@/socket/user";
import usePeer from "@/hooks/usePeer";
import useStream from "@/hooks/useMediaStream";
import PeerVideo from "../PeerVideo";
import { UsersArea } from "./Users";
import axios from "axios";
export function SharingArea({ roomId, user }) {
  axios.defaults.withCredentials = true;
  const socket = useSocket();
  const { push } = useRouter();
  const { peer, myId: peerId, isPeerReady } = usePeer(roomId, user.id);
  const { stream, isSuccess, toggleAudio, toggleVideo, muted, visible } =
    useStream();
  const [sharedScreens, setSharedScreens] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [foucsedScreen, setFocusedScreen] = useState(null);
  const screensPerPage = 4;

  const [roomUsersList, setRoomUsersList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_API_URL}rooms/${roomId}`, {
        data: {
          roomUsers: true,
        },
        headers: {
          "Cache-Control": "no-cache", //disable cache
        },
      })
      .then((res) => {
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
      socket.emit("user:leaveRoom", { roomId, userId: user.id });
    };
  }, [socket]);
  useEffect(() => {
    if (!isPeerReady || !peer || !socket || !isSuccess || !roomUsersList)
      return;
    peer.on("disconnected", () => {
      console.log("peer disconnected");
    });
    peer.on("open", (id) => {
      // set my stream
      // add my stream to roomUsersList
      setRoomUsersList((prev) => {
        const updatedUsersList = prev.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              stream: stream,
              muted: muted,
            };
          }
          return user;
        });
        // log users list after adding my stream
        console.log("users list", updatedUsersList);

        return updatedUsersList;
      });
    });
    socket.on("user:peerConnected", (userId) => {
      if (userId !== user.id) {
        const call = peer.call(userId, stream);
        call.on("stream", (stream) => {
          // add caller stream to roomUsersList
          setRoomUsersList((prev) => {
            const updatedUsersList = prev.map((user) => {
              if (user.id === call.peer) {
                return {
                  ...user,
                  stream: stream,
                  muted: muted,
                };
              }
              return user;
            });
            // log users list after adding my stream
            console.log("users list", updatedUsersList);

            return updatedUsersList;
          });
          console.log("caller peer", call.peer);
        });
      }

      socket.on("user:peerDisconnected", (streamId) => {
        // remove stream from roomUsersList
        setRoomUsersList((prev) => {
          const updatedUsersList = prev.filter(
            (user) => user?.stream?.id !== streamId
          );
          // log users list after removing stream
          console.log("users list", updatedUsersList);

          return updatedUsersList;
        });
      });
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (friendstream) => {
        // add answer  stream to roomUsersList
        setRoomUsersList((prev) => {
          const updatedUsersList = prev.map((user) => {
            if (user.id === call.peer) {
              return {
                ...user,
                stream: stream,
                muted: muted,
              };
            }
            return user;
          });
          // log users list after adding my stream
          console.log("users list", updatedUsersList);

          return updatedUsersList;
        });
        // answer stream
        console.log("answer call from ", call.peer);
      });
    });

    socket.on("peer:toggleAudio", ({ streamId, muted }) => {
      const streams = sharedScreens.map((s) => {
        if (s.stream.id === streamId) {
          s.muted = muted;
        }
        return s;
      });
      setSharedScreens(streams);
    });

    return () => {
      socket.off("user:peerConnected");
      socket.off("user:peerDisconnected");
    };
  }, [isPeerReady, peer, socket, peerId, stream, sharedScreens, roomUsersList]);

  const leaveRoom = async () => {
    // close mediaDevices
    stream?.getTracks().forEach((track) => track.stop());
    // close peer connection
    if (peer) {
      peer.disconnect();
      peer.destroy();
    }

    socket.emit("user:leaveRoom", {
      roomId,
      userId: user.id,
    });
    socket.emit("peer:leave", { roomId, streamId: stream?.id });
    push("/");
  };

  const handleScreenClick = (screen) => {
    setFocusedScreen(screen);
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

  const handleToggleAudio = () => {
    stream.muted = !muted;
    toggleAudio(stream);
    socket.emit("peer:toggleAudio", { roomId, streamId: stream.id, muted });
  };

  const handleToggleVideo = () => {
    console.log("toggle video", visible);
    console.log("toggle audio", muted);
    toggleVideo();
    // socket.emit("peer:toggleVideo", { roomId, streamId: stream.id });
  };
  return (
    <>
      <UsersArea
        roomUsersList={roomUsersList}
        handleScreenClick={handleScreenClick}
      />
      <div className="col-span-5 flex flex-col gap-4 p-4 overflow-hidden relative">
        <h2 className="text-xl font-semibold">Screen Sharing</h2>

        {foucsedScreen && (
          <>
            <button
              onClick={() => setFocusedScreen(null)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Close
            </button>
            <PeerVideo
              isMe={true}
              stream={foucsedScreen}
              className="w-full h-[60%]"
            />
          </>
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
        <div className="flex gap-4 flex-wrap mt-auto">
          <Button variant="outline" onClick={handleToggleAudio}>
            <IconCamera className="h-6 w-6 mr-2" />
            Mute Audio
          </Button>
          <Button variant="outline" onClick={handleToggleVideo}>
            <IconCamera className="h-6 w-6 mr-2" />
            Camera
          </Button>
          <Button
            variant="outline"
            onClick={(e) => console.log("share screen")}
          >
            <IconVideocamera className="h-6 w-6 mr-2" />
            Share Screen
          </Button>
          <button
            onClick={leaveRoom}
            className="bg-red-500 text-white p-2 rounded-md w-full"
          >
            Leave Room
          </button>
        </div>
      </div>
    </>
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
