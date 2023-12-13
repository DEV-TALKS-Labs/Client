"use client";
import React, { useState } from "react";
import PopupModal from "./Popup";

export default function AddNewRoom({ token }) {
  const [isVisible, setIsVisible] = useState(false);

  const togleIsVisible = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <button
        onClick={togleIsVisible}
        className="bg-gray-800 mb-2 md:mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 w-full md:w-[32.1%] max-w-sm p-6 rounded-lg xl:w-[24.3%] h-44"
      >
        <span className="mb-2 font-bold   text-white flex w-full items-center justify-center text-[50px]">
          +
        </span>
        <p className="font-normal text-white text-center">Create new room</p>
      </button>

      <PopupModal visible={isVisible} onClose={togleIsVisible} token={token} />
    </>
  );
}
