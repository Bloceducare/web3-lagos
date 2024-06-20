/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import {ISkills, AreaOfContribution} from "../../models/index"

type IVolunteer = {
  userName: string;
  email: string;
  location: string;
  skills:ISkills;
  areaOfContribution: AreaOfContribution;


};

const defaultUserInput = {
  userName: "",
  email: "",
  location: "",
  skills:ISkills.none,
  areaOfContribution: AreaOfContribution.none,
};

const ApplyAsaVolunteer = () => {
  const [userInputs, setUserInputs] = useState(defaultUserInput);
  const [dataStatus, setDataStatus] = useState({ crud: false, error: "" });
  const { crud } = dataStatus;
  const [message, setMessage] = useState("");
  const {
    userName,
    email,
    location,
  } = userInputs;
  
  type DetailedHTMLProps = /*unresolved*/ any

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInputs(() => ({
      ...userInputs,
      [name]: value,
    }));
  };

  const postData = async (data: IVolunteer) => {
    const subData = { ...data, name: data.userName, };
    setDataStatus(() => ({
      error: "",
      crud: true,
    }));

    try {
      console.log(subData)
      const result = await axios.post("/api/volunteer", subData);
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
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
          Volunteers' Registration
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
                  Location <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Put in your location."
                  className="w-full p-3 border rounded shadow"
                  onChange={handleChange}
                  value={location}
                  required
                />
              </div>

           


              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <div className="mb-5 ">
                    <label className="block mb-2 font-bold text-gray-600">
                      Skills{" "}
                    </label>
                    <select
                  className="block w-full p-3 mt-1 border form-select"
                  name="skills"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Please Select an Option
                  </option>
                  <option value={ISkills.marketing}>Marketing</option>
                  <option value={ISkills["content-development"]}>Content Development</option>
                  <option value={ISkills.design}>Design</option>
                </select>
                  </div>

                  <div className="mb-5">
                    <label className="block mb-2 font-bold text-gray-600">
                      Area of Contribution{" "}
                    </label>
                    <select
                  className="block w-full p-3 mt-1 border form-select"
                  name="areaOfContribution"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Please Select an Option
                  </option>
                  <option value={AreaOfContribution.moderation}>Moderation</option>
                  <option value={AreaOfContribution.registration}>Registration</option>
                  <option value={AreaOfContribution["ushering/protocol"]}>Ushering/Protocol</option>
                </select>
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

export default ApplyAsaVolunteer;
