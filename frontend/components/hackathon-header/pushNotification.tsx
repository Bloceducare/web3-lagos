import { IoIosNotificationsOutline } from "react-icons/io";
import { useState } from "react";

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};
type PushNotifyProps = {
  user: User | null;
};

const PushNotify: React.FC<PushNotifyProps> = ({ user }) => {
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
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={handleModalToggle} className="">
        <IoIosNotificationsOutline className="w-10 h-6" />
      </button>
      {isModalOpen && (
        <div
          className=" z-40 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex  items-end justify-center pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            >
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className=" fixed  bg-[#fff] inline-block align-bottom border border-[#545457] border-r-4 border-b-4  rounded-lg text-left overflow-hidden shadow-[-4px_-4px_0px_2px_#0096FF] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Notification
                    </h3>
                    <button
                      onClick={handleModalClose}
                      className="text-black-600"
                    >
                      X
                    </button>
                  </div>

                  <div className="mt-2">
                    <span className="font-bold ">
                      {" "}
                      Hello, {user ? user.first_name : "Guest"}!{" "}
                    </span>
                    <p className="text-sm text-black mt-2">
                      will you like to join our telegram page for more
                      information? click the join telegram button.
                    </p>
                    <p className="mt-2 text-sm text-black">
                      To update your profile click the update profile button
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleEditProfileClick}
                    className="w-full inline-flex justify-center rounded-md border border-black  px-4 py-2  text-base font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm shadow-[-5px_-5px_0px_0px_#0096FF]"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleTelegramLinkClick}
                    className=" shadow-[-5px_-5px_0px_0px_#0096FF] mt-3 w-full inline-flex justify-center rounded-md border border-black  px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Join Telegram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PushNotify;
