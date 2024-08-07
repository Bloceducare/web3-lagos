
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import BackgroundColor from "@/components/hackathon-bg";


type FormData = {
  email: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};
const initialFormState: FormData = {
  email: "",
};

const initialFormErrors: FormErrors = {};

export default function ForgotPassword() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const router = useRouter(); // Get the router instance

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

    const response = await fetch(
      "https://web3lagosbackend.onrender.com/users/password_reset/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Email sent successfully!");
      setFormData(initialFormState);
      setIsSuccess(true); // Show success screen
      router.push('/'); // Navigate back to homepage
    } else {
      setErrors(data);
      setMessage("Error: check email again");
    }

    setLoading(false);
  };

  return (
    <main className=" relative flex flex-col min-h-screen overflow-hidden ">

    <BackgroundColor />

    <div className=" mx-auto mt-40  max-w-3xl p-6 ">
      <div className="border border-black rounded-lg w-full bg-[#fff] lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <h1 className="text-xl lg:text-4xl font-bold mt-3">
          Enter your email address
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-gray-600 my-8"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full p-4 border  border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
              value={formData.email}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-12 p-6 bg-[#1E1E1E] text-white text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
    </main>
  );
}



