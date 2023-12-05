import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { Room } from "@/components/Room/Room";
import React from "react";

export default function pageId({ params }) {
  const currentRoomId = params.id;

  return (
    <div>
      <Navbar />
      <Room currentRoomId={currentRoomId} />
      <Footer />
    </div>
  );
}
