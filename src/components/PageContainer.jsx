"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import MultiSelect from "./MultiSelect";
import CardList from "./CardList";

function PageContainer({ options, rooms: allRooms, token }) {
  const [rooms, setRooms] = useState(allRooms.data);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const filterRooms = () => {
      let filteredRooms;

      if (selected.length === 0 && searchValue === "") {
        setRooms(allRooms.data);
        return;
      }

      filteredRooms = allRooms.data.filter((room) => {
        const hasSelectedFilter = selected.some((selectedFilter) =>
          room.filters.some((filter) => filter.name === selectedFilter.name)
        );

        const hasSearchValue = room.title.toLowerCase().includes(searchValue);

        return selected.length === 0
          ? hasSearchValue
          : hasSelectedFilter && hasSearchValue;
      });

      setRooms(filteredRooms);
    };
    filterRooms();
  }, [selected, searchValue]);

  const searchFilter = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <div className="h-[83vh] m-auto max-w-[85%] pt-2">
      <SearchBar searchFilter={searchFilter} />
      <MultiSelect options={options} setSelected={setSelected} />
      <CardList rooms={rooms} token={token} setRoomList={setRooms} />
    </div>
  );
}

export default PageContainer;
