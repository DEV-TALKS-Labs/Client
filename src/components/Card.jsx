import Link from "next/link";
import React from "react";

export default function Card({ data }) {
  
  const { id, title } = data;
  return (
    <Link
      href={`/${id}`}
      className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex-shrink-0 w-full sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] m-2'
    >
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h5>
      <p className='font-normal text-gray-700 dark:text-gray-400'>
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Link>
  );
}
