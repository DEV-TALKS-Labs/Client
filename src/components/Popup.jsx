"use client";
import MultiSelect from "./MultiSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { emitCreateRoom } from "@/socket/room";
import { useSocket } from "@/context/socketContext";

const PopupModal = ({ visible, onClose, token }) => {
  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState(12);
  const [filters, setFilters] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    axios.get("http://localhost:8080/api/filters").then((res) => {
      setFilters(res.data);
    });
  }, []);

  const createRoom = (e) => {
    e.preventDefault();
    emitCreateRoom(socket, {
      room: {
        title,
        maxUsers: parseInt(maxPeople),
        isPublic: true,
        filters: ["FrontEnd"],
      },
      headers: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    onClose();
  };

  return (
    <>
      {visible && (
        <div
          className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden '
          id='popup-modal'
        >
          <div className='p-4 w-full h-2/3'>
            <div className='bg-white rounded-lg shadow dark:bg-gray-700'>
              <button
                onClick={onClose}
                type='button'
                className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
              <div className='p-4 md:p-5 text-center'>
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 dark:text-white'>
                  Create new room
                </h3>

                <form onSubmit={createRoom}>
                  <label className='text-sm font-semibold flex'>
                    <span className='text-white dark:text-gray-400 mx-5'>
                      Room Title
                    </span>
                    <input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type='text'
                      className='block w-full p-3 border border-gray-300 rounded mb-4'
                      placeholder='Title'
                    />
                  </label>

                  <label className='text-sm font-semibold flex'>
                    <span className='text-gray-700 dark:text-gray-400 mx-5'>
                      Max people
                    </span>
                    <input
                      onChange={(e) => {
                        setMaxPeople(e.target.value);
                      }}
                      type='number'
                      className='block w-full p-3 border border-gray-300 rounded mb-4'
                      placeholder='Max people (12)'
                      max={12}
                      min={2}
                    />
                  </label>
                  <MultiSelect options={filters} />

                  <button
                    type='submit'
                    className='text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2'
                    data-modal-hide='popup-modal'
                  >
                    Create new room
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
