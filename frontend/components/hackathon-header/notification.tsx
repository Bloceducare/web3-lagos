import { useState } from "react";

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditProfileClick = () => {
    console.log("Edit Profile clicked");
    // Here you would navigate to the edit profile page or perform other actions
  };

  const handleTelegramLinkClick = () => {
    console.log("Telegram link clicked");
    // Here you would navigate to the Telegram link or perform other actions
  };

  return (
    <div>
      <div className="  bg-[#fff] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex justify-between items-center">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Notification
            </h3>
            <button onClick={handleModalClose} className="text-red-600">
              X
            </button>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              First paragraph text here. You can replace this with your own
              content.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Second paragraph text here. Again, replace this with your own
              content.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={handleEditProfileClick}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Edit Profile
          </button>
          <button
            type="button"
            onClick={handleTelegramLinkClick}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Link to Telegram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
