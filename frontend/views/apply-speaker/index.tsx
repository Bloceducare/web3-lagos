import { useState } from "react";

type FormData = {
  userName: string;
  email: string;
  telegramID: string;
  twitterHandle: string;
  companyName: string;
  role: string;
  presentationTitle: string;
  pitchStory: string;
  spokenAtWeb3Before: boolean;
  gender: string;
  type: string;
};

const initialFormState: FormData = {
  userName: "",
  email: "",
  telegramID: "",
  twitterHandle: "",
  companyName: "",
  presentationTitle: "",
  role: "",
  pitchStory: "",
  spokenAtWeb3Before: false,
  gender: "",
  type: "speaker",
};

const roles = [
  'Developer',
  'Investor',
  'Community Manager',
  'Trader',
  'Researcher',
  'Other',
];

const ApplyAsaSpeaker = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Type guard to handle 'checked' property only for checkboxes
    const newValue = (e.target as HTMLInputElement).type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : value;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  const handleDelete = () => {
    setFormData(initialFormState);
  };

  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    inputStyle: string;
  }

  const Input: React.FC<InputProps> = ({ label, inputStyle, ...rest }) => {
    return (
      <div className={`flex flex-col lg:h-[80px] justify-end w-full lg:w-[50%] ${inputStyle}`}>
        <label className="block text-gray-700 text-sm font-bold">
          {label}
        </label>
        <input
          {...rest}
          className={`appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px]`}
          // onChange={handleChange}
        />
      </div>
    );
  };

  const gradientStyle = {
    background: 'linear-gradient(90deg, #C96C4E 9.5%, #AC615D 27%, #895470 37%, #3E3797 70%, #BD6854 84%, #3E3797 100%, #C96C4E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full text-center">
        <h1 style={gradientStyle} className="text-[50px] font-black">Web3 Lagos Conference 2.0: Registration Form</h1>
        <div className="h-[150px] flex flex-col justify-between mt-5 pb-8 border-b-[1px] ">
          <h4 style={gradientStyle} className="text-[36px] font-black">Register Now!</h4>
          <p className="text-[#181818] ">Be a part of the event</p>
          <p className="text-[#343D42] font-medium text-[20px] ">Fill in the informations carefully</p>
        </div>
      </div>
      <div className="  w-[88vw] bg-white rounded lg:px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl font-medium my-10">Speaker&apos;s Details</h1>
        <form onSubmit={handleSubmit} className="border-[1px] p-[20px] lg:p-[40px] rounded-[10px] shadow-md">
          <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
            <Input
              inputStyle=""
              label="Speaker's Name"
              type="text"
              name="userName"
              placeholder="Your Firstname"
              value={formData.userName}
              onChange={handleChange}
            />
            <Input
              inputStyle=""
              label=""
              type="text"
              name="userName"
              placeholder="Other Name"
              value=""
              onChange={handleChange}
            />
          </div>
          
          <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
            <Input
              inputStyle=""
              label="Email Address"
              type="email"
              name="emailAddress"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              inputStyle=""
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="Your Phone Number "
              value=""
              onChange={handleChange}
            />
          </div>

          <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
            <Input
              inputStyle=""
              label="Company's Name as Applicable. If not applicable place a N/A in the box."
              type="text"
              name="userName"
              placeholder="Your Firstname"
              value=""
              onChange={handleChange}
            />
            <Input
              inputStyle=""
              label="Link to Your website or Link to Your (Portfolio/Resume/GitHub)"
              type="text"
              name="links"
              placeholder=""
              value={formData.telegramID}
              onChange={handleChange}
            />
          </div>

          <div className="sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
            <Input
              inputStyle=""
              label="Location"
              type="text"
              name="location"
              placeholder="What City Are You In?"
              value=""
              onChange={handleChange}
            />
            <Input
              inputStyle=""
              label="X Handle "
              type="text"
              name="XHandle"
              placeholder="Put In Your X Handle"
              value=""
              onChange={handleChange}
            />
          </div>
          <div className="my-10">
            <p className="text-[20px]">Craft a concise, informative, and attention-grabbing title for your lecture.</p>
            <Input
              inputStyle="lg:w-full mt-4"
              label="Title of your Lecture"
              type="text"
              name="Lecture Title"
              placeholder="What is the Title of your Lecture?"
              value=""
              onChange={handleChange}
            />
            <div className="flex mt-4 sm:flex-wrap mb-4 w-full lg:flex lg:gap-[20px] lg:flex-nowrap justify-between align-bottom h-auto">
              <Input
                inputStyle=""
                label="X Handle "
                type="text"
                name="XHandle"
                placeholder="Put In Your X Handle"
                value=""
                onChange={handleChange}
              />

              <Input
                inputStyle=""
                label="Category Not Listed  "
                type="text"
                name="XHandle"
                placeholder="Put In Your X Handle"
                value=""
                onChange={handleChange}
              />

            </div>
              <label>Write a compelling session abstract (150-250 words) that showcases your content.</label>
              <textarea name="" id="" rows={10} className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              What Best Describes Your Role in Web3:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="appearance-none border rounded-[10px] py-3 px-3 mt-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[14px] lg:w-full"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Clear Form
            </button>
            <button
              className="bg-blue-700 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyAsaSpeaker;
