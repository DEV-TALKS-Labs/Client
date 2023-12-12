"use client";
import { memo } from "react";

const PeerVideo = ({ stream, name, isMe, className }) => (
  <>
    <video
      ref={(node) => {
        if (node) node.srcObject = stream;
      }}
      autoPlay
      muted={isMe}
      className={className}
    />

    <p className="font-medium absolute bottom-3 left-4 text-xs">
      <span className="text-white">{name}</span>
    </p>
  </>
);

export default memo(PeerVideo);
