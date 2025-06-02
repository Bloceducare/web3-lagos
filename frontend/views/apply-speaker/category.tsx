import React, { useState, ChangeEvent, FocusEvent } from "react";

type CategoryProps = {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement | HTMLInputElement>) => void;
};

const Category: React.FC<CategoryProps> = ({ id, name, value, onChange, onBlur }) => {
  const [category, setCategory] = useState<string>(value);
  const [otherCategory, setOtherCategory] = useState<string>("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    onChange(e);
    if (e.target.value !== "others") {
      setOtherCategory("");
    }
  };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherCategory(e.target.value);
    onChange(e);
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-bold text-gray-600">
        Category <span className="text-red-600">*</span>
      </label>

      <select
        className="block w-full p-3 mt-1 border form-select rounded-xl"
        id={id}
        name={name}
        value={category}
        onChange={handleSelectChange}
        onBlur={onBlur}>
        <option value="" disabled>
          Please Select an Option
        </option>
        <option value="beginner">Web3 beginner</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="content">Content Creators</option>
        <option value="community">Community Builders/Manager</option>
        {/* <option value="investor">Investor</option> */}
        <option value="researcher">Researcher</option>
        <option value="others">Others</option>
      </select>

      {category === "others" && (
        <div className="mt-4">
          <label
            htmlFor="otherCategory"
            className="block mb-2 font-bold text-gray-600">
            Please specify your category <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="otherCategory"
            value={otherCategory}
            onChange={handleOtherChange}
            onBlur={onBlur}
            className="block w-full p-3 mt-1 border rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default Category;
