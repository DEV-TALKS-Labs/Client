import Link from "next/link";
import React from "react";

export default function Card({ data }) {
  const { id, title } = data;
  return (
    <Link
      prefetch={false}
      href={`/${id}`}
      className="bg-gray-800 mb-2 md:mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 md:w-[32.1%] w-full p-6 rounded-lg xl:w-[24.3%] h-44 flex flex-col justify-between"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {`${title}`}
      </h5>
      <h6 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
        {`users ${data._count.roomUsers} / ${data.maxUsers}`}
      </h6>
      <div className="flex flex-wrap overflow-y-auto">
        {data.filters.map((filter, idx) => {
          return (
            <div
              key={idx}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {filter.name}
            </div>
          );
        })}
      </div>
    </Link>
  );
}
