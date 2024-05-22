import { useState } from "react";
import axios from "axios";

type ISponsor = {
  userName: string;
  email: string;
  telegramID: string;
  twitterHandle: string;
  companyName: string;
  companyLocation: string;
  type: string;
  whyAcceptAsSponsor: string;
  otherWaysOfSponsoring: string;
  sponsorAmtRange: string;
  whatToSponsor: string;
};
const defaultUserInput = {
  userName: "",
  email: "",
  telegramID: "",
  twitterHandle: "",
  companyName: "",
  companyLocation: "",
  type: "sponsor",
  whyAcceptAsSponsor: "",
  otherWaysOfSponsoring: "",
  sponsorAmtRange: "",
  whatToSponsor: "",
};

const ApplyAsaSponsor = () => {
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
    companyLocation,
    whyAcceptAsSponsor,
    otherWaysOfSponsoring,
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
      [name]: value,
    }));
  };

  const postData = async (data: ISponsor) => {
    const subData = { ...data };
    setDataStatus(() => ({
      error: "",
      crud: true,
    }));

    try {
      const result = await axios.post("/api/participant", subData);
      setMessage(result.data.message);

      setDataStatus(() => ({
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
      <div className="text-center">
        <h1 className="my-6 text-3xl font-semibold text-gray-800">
          Sponsors' Application
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
                {/* border-red-300  */}
                {/* <p className="mt-2 text-sm text-red-400">Email is required</p> */}
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Which company, protocol or DAO do you work for?{" "}
                  <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Put in your company or protocol name."
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={companyName}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Where Is Your Company Registered Location{" "}
                </label>
                <input
                  type="text"
                  name="companyLocation"
                  placeholder="Put in your location."
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={companyLocation}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  Why do you think that we should accept you as a sponsor?{" "}
                  <span className="text-red-600">*</span>{" "}
                </label>
                <textarea
                  name="whyAcceptAsSponsor"
                  value={whyAcceptAsSponsor}
                  onChange={handleChange}
                  className="block w-full p-3 mt-1 border rounded shadow form-textarea"
                  rows={2}
                  placeholder="Enter some long form content."
                  required
                ></textarea>
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-600">
                  How else do you think that you can help Web3 Conference Lagos
                  apart from sponsoring the main event?{" "}
                  <span className="text-red-600">*</span>{" "}
                </label>
                <textarea
                  name="otherWaysOfSponsoring"
                  value={otherWaysOfSponsoring}
                  onChange={handleChange}
                  className="block w-full p-3 mt-1 border rounded shadow form-textarea"
                  rows={2}
                  placeholder="Enter some long form content."
                ></textarea>
              </div>

              <div className="mb-5 ">
                <label className="block mb-2 font-bold text-gray-600">
                  {" "}
                  What could be the range of your sponsorship? ($)
                </label>
                <div className="flex flex-wrap items-center mt-2 [&>div]:my-2 md:justify-start justify-center">
                  <div className="md:mr-6 md:my-0 ">
                    <input
                      id="sponsorAmtRange-50k-100k"
                      type="radio"
                      className="form-radio"
                      name="sponsorAmtRange"
                      value="2000-4999"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="sponsorAmtRange-50k-100k"
                      className="inline-flex items-center"
                    >
                      <span className="">2000 - 4999</span>
                    </label>
                  </div>
                  <div className="md:mr-6 md:my-0">
                    <input
                      id="sponsorAmtRange-100k-300k"
                      type="radio"
                      className="form-radio"
                      name="sponsorAmtRange"
                      value="5000-9999"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="sponsorAmtRange-100k-300k"
                      className="inline-flex items-center"
                    >
                      <span className="">5000-9999</span>
                    </label>
                  </div>
                  <div className="md:mr-6 md:my-0">
                    <input
                      id="sponsorAmtRange-300k-500k"
                      type="radio"
                      className="form-radio"
                      name="sponsorAmtRange"
                      value="10000-above"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="sponsorAmtRange-300k-500k"
                      className="inline-flex items-center"
                    >
                      <span className="">1000 and above</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5 ">
                <label className="block mb-2 font-bold text-gray-600">
                  {" "}
                  What would you like to sponsor?{" "}
                </label>
                <div className="flex flex-wrap items-center mt-2 [&>div]:my-2 md:justify-start justify-center">
                  <div className="mr-6">
                    <input
                      id="whatToSponsor-main-event"
                      type="radio"
                      className="form-radio"
                      name="whatToSponsor"
                      value="main-event"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="whatToSponsor-main-event"
                      className="inline-flex items-center"
                    >
                      <span className="">Main Event</span>
                    </label>
                  </div>
                  <div className="md:mr-6 md:my-0">
                    <input
                      id="whatToSponsor-hackatons"
                      type="radio"
                      className="form-radio"
                      name="whatToSponsor"
                      value="hackatons"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="whatToSponsor-hackatons"
                      className="inline-flex items-center"
                    >
                      <span className="">Hackatons</span>
                    </label>
                  </div>

                  <div className="md:mr-6 md:my-0">
                    <input
                      id="whatToSponsor-others"
                      type="radio"
                      className="form-radio"
                      name="whatToSponsor"
                      value="others"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="whatToSponsor-others"
                      className="inline-flex items-center"
                    >
                      <span className="">Others</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <div className="mb-5 ">
                    <label className="block mb-2 font-bold text-gray-600">
                      Telegram ID{" "}
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
                      Twitter Handle{" "}
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
      </div>
    </div>
  );
};

export default ApplyAsaSponsor;
