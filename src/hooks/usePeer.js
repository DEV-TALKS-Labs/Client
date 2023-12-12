import { useEffect, useState } from "react";

import { useSocket } from "@/context/socketContext";

const usePeer = (roomId, userId) => {
  const socket = useSocket();

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    if (!socket) return;
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import("peerjs")).default(userId);
        setPeer(peer);
        setIsLoading(false);

        peer.on("open", (id) => {
          setMyId(id);
          socket.emit("user:newPeer", { roomId, userId: id });
        });
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      if (peer) peer?.destroy();
    };
  }, []);

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;
