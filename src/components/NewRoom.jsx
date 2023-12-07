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
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex-shrink-0 w-full sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] m-2"
      >
        <h1 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-8xl text-center">
          +
        </h1>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          Create new room
        </p>
      </button>

      <PopupModal visible={isVisible} onClose={togleIsVisible} token={token} />
    </>
  );
}
