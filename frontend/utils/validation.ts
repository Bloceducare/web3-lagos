export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateURL = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateXHandle = (handle: string): boolean => {
  if (!handle) return true; // Optional field
  
  // Check if it's a URL
  if (handle.startsWith('http://') || handle.startsWith('https://')) {
    try {
      const url = new URL(handle);
      // Check if it's a valid X/Twitter URL
      return url.hostname === 'twitter.com' || url.hostname === 'x.com';
    } catch {
      return false;
    }
  }
  
  // Check if it's a traditional handle format
  const handleRegex = /^@?[\w\d_]{1,15}$/;
  return handleRegex.test(handle);
};

export const validateTelegramId = (id: string): boolean => {
  if (!id) return false; // Required field
  const telegramRegex = /^@?[\w\d_]{5,32}$/;
  return telegramRegex.test(id);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateTextLength = (text: string, min: number, max: number): boolean => {
  if (!text) return true; // Optional field
  return text.length >= min && text.length <= max;
};

export const validateSessionAbstract = (text: string): boolean => {
  if (!text) return true; // Optional field
  if (text.trim().toUpperCase() === 'N/A') return true;
  return text.length >= 1000 && text.length <= 10000; 
};

export const validatePitchStory = (text: string): boolean => {
  if (!text) return true; // Optional field
  if (text.trim().toUpperCase() === 'N/A') return true; // Allow N/A
  return text.length >= 300 && text.length <= 5000;
};

export const validateProfilePic = (file: File | null): boolean => {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  return validTypes.includes(file.type) && file.size <= maxSize;
}; 