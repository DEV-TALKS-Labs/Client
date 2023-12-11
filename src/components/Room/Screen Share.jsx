"use client";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socketContext";
import { Peer } from "peerjs";
import PeerVideo from "../peer/PeerVideo";
export function SharingArea({ roomId, user }) {
  const socket = useSocket();
  const { push } = useRouter();
  const [stream, setStream] = useState(null);
  const [peerStream, setPeerStream] = useState(null);
  const [peers, setPeers] = useState(null);
  // const peer = new Peer(user.id, {
  //   host: "/",
  //   port: "3003",
  // });
  // useEffect(() => {
  //   if (!socket) return;
  //   const peer = new Peer();
  //   setPeers(peer);
  //   const createStream = async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: false,
  //       video: true,
  //     });
  //     setStream(stream);
  //   };
  //   peer.on("open", (id) => {
  //     console.log(id);
  //     socket.emit("user:newPeer", { roomId, userId: id });
  //   });
  //   socket.on("user:peerConnected", (userId) => {
  //     connectToNewUser(userId, stream);
  //   console.log("peerConnected", userId);
  //   const call = peer.call(userId, stream);
  //   // connectToNewUser(userId, stream);
  //   // console.log(userId);
  //   console.log("xxxxxxx", call);
  // console.log("pppppppppp", peers);
  //   call.on("stream", (userStream) => {
  //     // console.log(userStream);
  //     // addVideoStream(video, userStream);
  //     setPeerStream(userStream);
  //   });
  // });

  // createStream();

  // return () => {
  // socket.off("user:peerConnected");
  // };
  // }, [socket]);
  const [myVideo, setMyVideo] = useState();
  const [friendVideo, setFriendVideo] = useState();
  let myPeer;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyVideo(stream);

        myPeer = new Peer(undefined, {
          host: "/",
          port: 3003,
          // path: "/peerjs",
        });

        myPeer.on("open", (id) => {
          console.log("My peer ID:", id);
          socket.emit("user:newPeer", { roomId, userId: id });
        });

        myPeer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (friendStream) => {
            console.log("friendStream", friendStream);
            setFriendVideo(friendStream);
          });
        });
      });

    socket.on("user:peerConnected", (userId) => {
      console.log("peerConnected", userId);
      const call = myPeer.call(userId, myVideo);
    });
    return () => {
      if (myPeer) {
        myPeer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    // socket.on("user:shareScreen", (roomId) => {
    //   console.log(roomId);
    // });
  }, [socket]);

  const leaveRoom = async () => {
    socket.emit("user:leaveRoom", { roomId, userId: user.id });
    push("/");
  };

  function connectToNewUser(userId, stream) {
    const call = peers.call(userId, stream);
    console.log("xxxxxxx", call);
    console.log("pppppppppp", peer);
    // const video = document.createElement("video");
    call.on("stream", (userStream) => {
      // console.log(userStream);
      // addVideoStream(video, userStream);
      console.log("userStream", userStream);
      setPeerStream(userStream);
    });
    // call.on("close", () => {
    //   video.remove();
    // });
    // const newpeer = {};
    // newpeer[userId] = call;
    // setPeers({ ...peers, ...newpeer });
  }
  // function addVideoStream(video, stream) {
  //   video.srcObject = stream;
  //   video.addEventListener("loadedmetadata", () => {
  //     video.play();
  //   });
  //   videoGrid.append(video);
  // }
  return (
    <div className="col-span-2 flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Screen Sharing</h2>
      <Card className="h-3/5">
        <div className="p-4">
          {/* <PeerVideo stream={stream} /> */}
          <PeerVideo stream={friendVideo} />
        </div>
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
