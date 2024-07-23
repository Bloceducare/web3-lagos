import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface EmailInputProps {
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailInput: React.FC<EmailInputProps> = ({ emails, setEmails }) => {
  const [input, setInput] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmail(input.trim());
    }
  };

  const addEmail = (email: string) => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
    setInput('');
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
    console.log(emails)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border rounded">
        {emails.map((email, index) => (
          <div key={index} className="flex items-center border rounded-3xl p-1 bg-blue-500 text-black px-3">
            <span>{email}</span>
            <button onClick={() => removeEmail(index)} className="ml-2">
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search email"
          className="w-full p-4 border text-black border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3"
        />
      </div>
    </div>
  );
};

export default EmailInput;
