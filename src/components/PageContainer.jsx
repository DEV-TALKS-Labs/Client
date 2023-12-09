"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import MultiSelect from "./MultiSelect";
import CardList from "./CardList";

function PageContainer({ options, rooms: allRooms, token }) {
  const [selected, setSelected] = useState([]);
  const [rooms, setRooms] = useState(allRooms.data);

  useEffect(() => {
    const filterRooms = () => {
      if (selected.length === 0) {
        setRooms(allRooms.data);
      } else {
        const filteredRooms = allRooms.data.filter((room) =>
          room.filters.some((filter) => {
            return selected.some(
              (selectedFilter) => selectedFilter.name === filter.name
            );
          })
        );
        setRooms(filteredRooms);
      }
    };
    filterRooms();
  }, [selected]);

  return (
    <div className="h-full m-auto max-w-[80%] mt-4">
      <SearchBar />
      <MultiSelect options={options} setSelected={setSelected} />
      <CardList rooms={rooms} token={token} setRoomList={setRooms} />
    </div>
  );
}

export default PageContainer;
