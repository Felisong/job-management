"use client";

// i can make this into a class to call validations from but eh

export const isFieldEmpty = (value: string, label: string): string => {
  if (value.trim().length === 0) {
    return `Please enter a valid ${label}.`;
  } else if (value.trim().length < 4) {
    return `${label} must be longer than 3 letters`;
  } else {
    return "";
  }
};

export const isRealDate = (value: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "Please enter a valid date as yyyy-mm-dd";
  }
  return "";
};

export const isValidEmail = (email: string): string => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "";
  } else {
    return "Please enter a valid Email";
  }
};

// Source - https://stackoverflow.com/a
// Posted by Srinivas, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-06, License - CC BY-SA 4.0
// thank you Srinvas!
export const isValidPassword = (value: string): string => {
  const pw = value.trim();
  const lettersRegex = /^(?=.*[A-Za-z])/;
  const numberRegex = /.*[0-9].*/;
  const specialCharRegex = /^(?=.*[@$!%*#?&])/;

  if (pw === "") return "Please enter a valid password";
  if (pw.length < 7) return "Password must be longer or equal to 8.";
  if (!lettersRegex.test(pw))
    return "Password must contain 1 upper and lower case letter each.";
  if (!numberRegex.test(pw)) return "Password must contain 1 number.";
  if (!specialCharRegex.test(pw))
    return "Password must contain one special character";
  return "";
};

export const isMatchingPassword = (value: string, pw: string): string => {
  if (value !== pw) return "Does not match password."
  return "";
 }