import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SuccessScreen from "../successScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  telegramusername: string;
  xhandle: string;
  role: string;
  gender: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};

const initialFormState: FormData = {
  name: "",
  email: "",
  phone: "",
  country: "",
  location: "",
  telegramusername: "",
  xhandle: "",
  role: "",
  gender: "",
};

const initialFormErrors: FormErrors = {};

const roles = [
  "Developer",
  "Investor",
  "Community Manager/Community Builder",
  "Trader",
  "Newbies",
  "Designer",
  "Marketer",
  "Product Manager",
  "Content",
  "Researcher",
  "Other",
];

const genders = ["Male", "Female", "Other"];

export default function PersonalDetailForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors(initialFormErrors);
  
    try {
      const response = await fetch(
        "https://web3lagosbackend.onrender.com/api/general-registrations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      // Check if response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        setMessage(errorData.message || "Registration failed. Please check your input.");
        toast.error(errorData.message || "Registration failed. Please check your input.");

        return;
      }
  
      const data = await response.json();
      toast.success("Registration successful!");
      // setMessage("Registration successful!");
      setFormData(initialFormState);
      setIsSuccess(true); 
    } catch (error: any) {
      // setMessage("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = () => {
    setFormData(initialFormState);
  };

  if (isSuccess) {
    return (
      <div className="">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="px-3 pt-[8rem]">
      <ToastContainer />
      <div className="w-full flex-col flex items-center justify-center text-center">
        <h1 className="mb-2 w-full bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
          Web3 Lagos Conference 3.0: Registration Form
        </h1>
        <p className="bg-gradient-to-r text-transparent bg-clip-text text-[1.5em] text-center font-semibold from-[#3E3797] via-[#895470] to-[#3E3797]">
          Register Now!
        </p>

        <p className="text-[0.8em]">Be a part of the Event</p>

        <p className="text-[1.3em] font-[500] mt-4 pb-10">
          Fill in the information carefully
        </p>
      </div>
     
      <hr className="font-bold text-black mb-4" />
      <section className="max-w-7xl mx-auto mb-10">
      <div className="formcontainer w-full flex flex-col  justify-between space-y-6 sm:px-8">
        <h1 className="font-bold text-[1.5em]">Personal Details</h1>
        <div className="text-center">
          {!!message && (
            <span
              className={`text-${
                message.includes("successful") ? "green" : "red"
              }-500`}>
              {message}
            </span>
          )}
        </div>

        <div className="sm:px-10 p-4 mx-auto bg-white rounded-lg shadow-xl w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="put in your full name"
                className="w-full p-3 rounded-lg border-[0.7px]"
                value={formData.name}
                required
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.join(", ")}</span>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Put in your email."
                className="w-full p-3 rounded-lg border-[0.7px]"
                value={formData.email}
                required
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.join(", ")}</span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 font-bold text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                placeholder="Put in your phone number."
                className="w-full p-3 rounded-lg border-[0.7px]"
                value={formData.phone}
                required
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.join(", ")}</span>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="The country you're coming from e.g Nigeria"
                className="w-full p-3 rounded-lg border-[0.7px]"
                onChange={handleChange}
                value={formData.country}
                required
              />
              {errors.country && (
                <span className="text-red-500">
                  {errors.country.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g Lagos"
                className="w-full p-3 rounded-lg border-[0.7px]"
                onChange={handleChange}
                value={formData.location}
                required
              />
              {errors.location && (
                <span className="text-red-500">
                  {errors.location.join(", ")}
                </span>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Telegram Username
              </label>
              <input
                type="text"
                name="telegramusername"
                placeholder="Put in your telegram ID"
                className="w-full p-3 rounded-lg border-[0.7px]"
                onChange={handleChange}
                value={formData.telegramusername}
              />
              {errors.telegramusername && (
                <span className="text-red-500">
                  {errors.telegramusername.join(", ")}
                </span>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                X Handle
              </label>
              <input
                type="text"
                name="xhandle"
                placeholder="Put in your X handle"
                className="w-full p-3 rounded-lg border-[0.7px]"
                onChange={handleChange}
                value={formData.xhandle}
              />
              {errors.xhandle && (
                <span className="text-red-500">
                  {errors.xhandle.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                Gender
              </label>
              <select
                className="w-full p-3 bg-white rounded-lg border-[0.7px]"
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                required>
                <option value="" disabled>
                  Please Select an Option
                </option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.join(", ")}</span>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold text-gray-600">
                What Best Describes Your Role In Web3
              </label>
              <select
                className="w-full p-3 bg-white rounded-lg border-[0.7px]"
                name="role"
                onChange={handleChange}
                value={formData.role}
                required>
                <option value="" disabled>
                  Please Select an Option
                </option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <span className="text-red-500">{errors.role.join(", ")}</span>
              )}
            </div>
            <div className="w-full justify-between flex">
              <button
                type="button"
                className="flex rounded-md items-center justify-center text-center space-x-2"
                onClick={handleDelete}>
                <Image
                  src={"/clearform.svg"}
                  alt="..."
                  height={10}
                  width={15}
                />
                <p className="text-center">Clear Form</p>
              </button>

              <button
                type="submit"
                className="rounded-lg from-[#3E3797] to-[#111022] bg-gradient-to-r text-white px-3 py-1.5 text-center"
                disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
   </section>

    </div>
  );
}
