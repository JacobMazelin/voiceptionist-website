
import React, { useState } from 'react';
import { isValidBusinessEmail } from '../utils/validation';

interface EmailInputProps {
  placeholder?: string;
  buttonText: string;
  className?: string;
  dark?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ placeholder = "What's your work email?", buttonText, className, dark }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidBusinessEmail(email)) {
      setError('Please enter a valid business email (not gmail.com)');
      return;
    }
    setError('');
    window.location.href = `/onboarding?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className={`flex items-center p-1 rounded-xl transition-all border ${dark ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'} focus-within:ring-2 focus-within:ring-ramp-lime`}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder} 
          className={`flex-1 px-4 py-3 bg-transparent outline-none text-sm ${dark ? 'text-white' : 'text-gray-900'}`}
        />
        <button type="submit" className="bg-ramp-lime text-black px-6 py-3 rounded-lg text-sm font-bold hover:brightness-95 transition-all">
          {buttonText}
        </button>
      </form>
      {error && (
        <div className="absolute top-full mt-2 left-0 bg-red-500 text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default EmailInput;
