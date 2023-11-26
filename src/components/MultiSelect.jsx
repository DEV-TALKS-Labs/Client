"use client";
import React, { useState } from "react";

const MultiSelect = ({ options, numberOfVisibles }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAllOptions, setShowAllOptions] = useState(false);

  const initiallyVisibleOptions = numberOfVisibles || 9;
  const handleSelectionChange = (value) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };
  const visibleOptions = showAllOptions
    ? options
    : options.slice(0, initiallyVisibleOptions);

  return (
    <div className="pr-4 py-4 flex w-full">
      <ul className="flex flex-wrap max-w-full">
        {options.length > initiallyVisibleOptions && (
          <li className="mb-2 mr-3 shadow-lg border border-blue-500 rounded-md">
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={() => setShowAllOptions(!showAllOptions)}
                className="hidden"
              />
              <span
                className={`cursor-pointer p-3 rounded-md ${
                  showAllOptions
                    ? "text-white font-semibold bg-blue-500"
                    : "text-gray-700"
                }`}
              >
                {showAllOptions ? "Show Less" : "Show All"}
              </span>
            </label>
          </li>
        )}
        {visibleOptions.map((option) => (
          <li
            key={option}
            className="mb-2 mr-3 shadow-lg border border-blue-500 rounded-md"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={selectedItems.includes(option)}
                onChange={() => handleSelectionChange(option)}
                className="hidden"
              />
              <span
                className={`cursor-pointer p-3 rounded-md ${
                  selectedItems.includes(option)
                    ? "text-white bg-blue-500"
                    : "text-gray-700"
                }`}
              >
                {option}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MultiSelect;
