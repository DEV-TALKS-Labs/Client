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
  </>
);

export default memo(PeerVideo);
