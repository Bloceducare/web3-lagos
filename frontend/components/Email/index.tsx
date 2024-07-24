import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface EmailInputProps {
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailInput: React.FC<EmailInputProps> = ({ emails, setEmails }) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmail(input.trim());
    }
  };

  const addEmail = (email: string) => {
    if (emails.length >= 4) {
      setError('You can only add up to 4 emails');
      return;
    }
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
      <div className="w-full p-4 flex flex-wrap gap-5 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3">
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
          className="w-full p-4 outline-none m-3"
        />
      </div>
    </div>
  );
};

export default EmailInput;
