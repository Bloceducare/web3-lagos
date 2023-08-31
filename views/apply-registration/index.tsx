import { useState } from "react";
import axios from "axios";
import { TwitterShareButton, TwitterIcon } from "react-share";
type IRegister = {
  userName: string;
  email: string;
  telegramID: string;
  twitterHandle: string;
  companyName: string;
  role: string;
  phone: string;
  type: string;
  location: string;
  // reasonForAttending: string;
  attendingOtherDays: boolean;
  // reasonForOtherDays: String;
};

const defaultUserInput = {
  userName: "",
  email: "",
  telegramID: "",
  twitterHandle: "",
  companyName: "",
  role: "", // out
  phone: "",
  type: "attendant",
  location: "", //out
  attendingOtherDays: false,
  // reasonForOtherDays: "", //out
  // reasonForAttending: "", //out
};
type DetailedHTMLProps = /*unresolved*/ any;
const ApplyAsAnAttendant = () => {
  const [userInputs, setUserInputs] = useState(defaultUserInput);
  const [dataStatus, setDataStatus] = useState({ crud: false, error: "" });
  const { crud } = dataStatus;
  const [message, setMessage] = useState("");
  const {
    userName,
    email,
    telegramID,
    twitterHandle,
    companyName,
    location,
    // reasonForAttending,
    // reasonForOtherDays,
    // attendingOtherDays,
    phone,
  } = userInputs;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInputs((prev) => ({
      ...prev,
      ...(name === "attendingOtherDays"
        ? { [name]: Boolean(Number(value)) }
        : { [name]: value }),
    }));
  };

  const postData = async (data: IRegister) => {
    const subData = { ...data, name: data.userName };
    setDataStatus(() => ({
      error: "",
      crud: true,
    }));

    try {
      const result = await axios.post("/api/participant", subData);
      setMessage(result.data.message);

      setDataStatus((prev) => ({
        error: "",
        crud: false,
      }));
    } catch (e: any) {
      setDataStatus(() => ({
        error: e?.response?.data?.message,
        crud: false,
      }));

      window.scroll({ top: 0, left: 0 });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    postData(userInputs);
  };

  return (
    <div className="p-3 mt-12">
      {/* <div className="p-10 mx-auto bg-white rounded-lg shadow md:w-3/4 lg:w-1/2 ">
        <h3 className="text-center">Registration has closed!! See you at the event 😊</h3>
      </div> */}
       <div className="text-center">
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
          Web3 Lagos 2023 Registration
        </h1>
        {!!dataStatus.error && (
          <span className="text-red-500 ">{dataStatus.error}</span>
        )}
      </div>
      <div className="p-10 mx-auto bg-white rounded-lg shadow md:w-3/4 lg:w-1/2">
        {!!!message && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="userName"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Name <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="userName"
                  onChange={handleChange}
                  placeholder="put in your full name"
                  className="w-full p-3 border border-gray-300 rounded shadow mb-"
                  value={userName}
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="twitter"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Email <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="email"
                  id="twitter"
                  name="email"
                  onChange={handleChange}
                  placeholder="Put in your email."
                  className="w-full p-3 border rounded shadow"
                  value={email}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="twitter"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Phone number <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Put in your phone number."
                  className="w-full p-3 border rounded shadow"
                  value={phone}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Location <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Lagos,Nigeria"
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={location}
                  required
                />
              </div>

              <div className="mb-5 ">
                <span className="block mb-2 font-bold text-gray-600">
                  Are you attending workshop days (Thursday and Friday)?
                </span>
                <div className="flex items-center p-3 mt-2">
                  <div className="">
                    <input
                      id="attendingOtherDays-yes"
                      type="radio"
                      className="form-radio"
                      name="attendingOtherDays"
                      value={1}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="attendingOtherDays-yes"
                      className="inline-flex items-center"
                    >
                      <span className="">Yes</span>
                    </label>
                  </div>

                  <div>
                    <input
                      id="attendingOtherDays-no"
                      type="radio"
                      className="form-radio"
                      name="attendingOtherDays"
                      value={0}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="attendingOtherDays-no"
                      className="inline-flex items-center ml-6"
                    >
                      <span className="">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Company Name{" "}
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Put in your company name."
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={companyName}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  What best describes your role in web3{" "}
                </label>
                <select
                  className="block w-full p-3 mt-1 border form-select"
                  name="role"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Please Select an Option
                  </option>
                  <option value="beginner">I am new to Blockchain/Web3</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="content">Content Creator</option>
                  <option value="community">Community Manager</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <div className="mb-5 ">
                    <label className="block mb-2 font-bold text-gray-600">
                      <span> Telegram Username </span>
                      <br />
                      <span className="text-xs hover:text-sky-500">
                        <a href="https://t.me/Web3bridge" target="_blank">
                          Do join our telegram channel
                        </a>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telegramID"
                      placeholder="Put in your telegram ID"
                      className="w-full p-3 border rounded shadow"
                      onChange={handleChange}
                      value={telegramID}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block mb-2 font-bold text-gray-600">
                      <span> Twitter Handle </span>
                      <br />
                      <span className="text-xs hover:text-sky-500">
                        <a
                          href="https://twitter.com/Web3Bridge"
                          target="_blank"
                        >
                          Follow us on twitter
                        </a>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="twitterHandle"
                      placeholder="Put in your twitter handle"
                      className="w-full p-3 border rounded shadow"
                      onChange={handleChange}
                      value={twitterHandle}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={crud}
                className="block w-full p-4 font-bold text-white bg-blue-500 rounded-lg"
              >
                {crud ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}

        {!!message && message}
        {!!message && (
          <div>
            <h4 className="mt-2">Make a tweet</h4>
            <TwitterShareButton
              className="items-center"
              url="https://event.web3bridge.com/"
              title="I just registered for web3Lagos Conference 2023 !!"
              hashtags={[
                "Web3",
                "Blockchain",
                "Web3Bridge",
                "Web3LagosConference",
              ]}
              related={["@Web3Bridge"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        )}
      </div> 
    </div>
  );
};

export default ApplyAsAnAttendant;
