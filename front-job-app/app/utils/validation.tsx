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
