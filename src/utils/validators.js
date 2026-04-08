// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 chars)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Validate registration form
export const validateRegisterForm = (formData) => {
  const errors = {};
  
  if (!formData.name || !isValidName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.password || !isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};

// Validate login form
export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.password || !isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};
