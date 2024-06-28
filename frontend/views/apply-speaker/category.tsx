import React, { useState, ChangeEvent } from 'react';

const Category: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [otherCategory, setOtherCategory] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (e.target.value !== 'others') {
      setOtherCategory('');
    }
  };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherCategory(e.target.value);
  };

  return (
    <div>
      <label htmlFor="category" className="block mb-2 font-bold text-gray-600">
        Category <span className="text-red-600">*</span>
      </label>

      <select
        className="block w-full p-3 mt-1 border form-select rounded-xl"
        name="category"
        value={category}
        onChange={handleChange}
        disabled={category === 'others'}
      >
        <option value="" disabled>
          Please Select an Option
        </option>
        <option value="beginner">I am new to Blockchain/Web3</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="content">Content Creator</option>
        <option value="community">Community Manager</option>
        <option value="investor">Investor</option>
        <option value="researcher">Researcher</option>
        <option value="others">Others</option>
      </select>

      {category === 'others' && (
        <div className="mt-4">
          <label htmlFor="otherCategory" className="block mb-2 font-bold text-gray-600">
            Please specify your category <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="otherCategory"
            value={otherCategory}
            onChange={handleOtherChange}
            className="block w-full p-3 mt-1 border rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default Category;
