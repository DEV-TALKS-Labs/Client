"use client";
import React from "react";
import SearchBar from "./SearchBar";
import MultiSelect from "./MultiSelect";
import CardList from "./CardList";

function PageContainer({options, rooms, token}) {
  return (
    <div className="h-full m-auto max-w-[80%] mt-4">
      <SearchBar />
      <MultiSelect options={options.data} />
      <CardList rooms={rooms.data} token={token} />
    </div>
  );
}

export default PageContainer;
