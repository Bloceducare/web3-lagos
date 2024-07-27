import React, { useState, useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

interface EmailInputProps {
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
  limit: number;
}

interface User {
  email: string;
  first_name: string;
  github_username: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ emails, setEmails, limit }) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://web3lagosbackend.onrender.com/users/users/');
        const data: User[] = await response.json();
        setAvailableUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addEmail(input.trim());
    }
  };

  const addEmail = (email: string) => {
    if (emails.length >= limit) {
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const emailMatch = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const fullMatch = new RegExp(`^${value}$`, 'i');

      const filteredSuggestions = availableUsers.filter(user =>
        emailMatch.test(value) ? user.email.toLowerCase().includes(value.toLowerCase()) : fullMatch.test(user.github_username)
      ).filter(user => !emails.includes(user.email));

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (user: User, e: MouseEvent) => {
    e.preventDefault();
    addEmail(user.email);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="w-full p-4 flex flex-wrap gap-5 border border-black shadow-[4px_4px_0px_0px_#1E1E1E] mt-3 relative">
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
          placeholder="Enter email or GitHub username"
          className="w-full p-4 outline-none m-3"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-[#fff] border border-gray-300 mt-16 w-full shadow-lg z-10">
            {suggestions.map((user, index) => (
              <li
                key={index}
                onClick={(e) => handleSuggestionClick(user, e)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {user.email} {user.github_username && `(@${user.github_username})`}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default EmailInput;
