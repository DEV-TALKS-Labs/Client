import MultiSelect from "./MultiSelect";

const PopupModal = ({ visible, onClose }) => {
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
    "Option 11",
    "Option 12",
    "Option 13",
    "Option 14",
    "Option 15",
    "Option 16",
    ];

    const createRoom = () => {
      console.log("create room");
    }

  return (
    <>
      {visible && (
        <div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden "
          id="popup-modal"
        >
          <div className="p-4 w-full h-2/3">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={onClose}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 dark:text-white">
                  Create new room
                </h3>

                <label className="text-sm font-semibold flex">
                  <span className="text-white dark:text-gray-400 mx-5">
                    Room Title
                  </span>
                  <input
                    type="text"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    placeholder="Title"
                  />
                </label>

                <label className="text-sm font-semibold flex">
                  <span className="text-gray-700 dark:text-gray-400 mx-5">
                    Max people
                  </span>
                  <input
                    type="number"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    placeholder="Max people (12)"
                    max={12}
                    min={2}
                  />
                </label>
                
                <MultiSelect options={options}/>
                
                <button
                  onClick={createRoom}
                  type="button"
                  className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  data-modal-hide="popup-modal"
                >
                  Create new room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
