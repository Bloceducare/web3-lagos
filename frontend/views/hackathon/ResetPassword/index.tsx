import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { EyeOff, Eye } from "lucide-react";
import ResetPasswordSuccessScreen from "./SuccessScreen";

type FormData = {
  new_password: string;
  confirm_new_password: string;
};

type FormErrors = {
  [key in keyof FormData]?: string[];
};

const initialFormState: FormData = {
  new_password: "",
  confirm_new_password: "",
};

const initialFormErrors: FormErrors = {};

export default function ResetPassword() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { uid, token } = router.query;

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

    const payload = {
      uid: uid as string,
      token: token as string,
      new_password: formData.new_password,
      confirm_new_password: formData.confirm_new_password,
    };

    const response = await fetch(
      "https://web3lagosbackend.onrender.com/users/complete-reset-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Reset password successful!");
      setFormData(initialFormState);
      setIsSuccess(true);
    } else {
      setErrors(data);
      setMessage("Reset password failed. Please try again.");
    }

    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="">
        <ResetPasswordSuccessScreen />
      </div>
    );
  }

  return (
    <div className="grid mx-auto mt-10 max-w-3xl p-6">
      <div className="border border-black rounded-lg w-full bg-white lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <h1 className="text-xl lg:text-4xl font-bold mt-3">
          Reset your password
        </h1>
        <h3 className="mb-8">
          Enter your new password and confirm it to complete the password reset
          process.
        </h3>
        <div className="text-center">
          {!!message && (
            <span
              className={`text-${
                message.includes("successful") ? "green" : "red"
              }-500`}
            >
              {message}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className=" ">
            <label
              htmlFor="new_password"
              className="block mb-2 font-bold text-gray-600 my-8"
            >
              New Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="new_password"
                name="new_password"
                onChange={handleChange}
                placeholder="Enter your new password."
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={formData.new_password}
                required
              />

              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <label
              htmlFor="confirm_new_password"
              className="block mb-2 font-bold text-gray-600 my-9"
            >
              Confirm New Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_new_password"
                name="confirm_new_password"
                onChange={handleChange}
                placeholder="Confirm your new password."
                className="w-full p-4 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] "
                value={formData.confirm_new_password}
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <button
              type="submit"
              className="mt-20 w-full p-5 bg-[#1E1E1E] text-white text-center shadow-[-5px_-5px_0px_0px_#0096FF]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
