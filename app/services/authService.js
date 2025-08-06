// services/authService.js

export const registerUser = async (formData) => {
  const response = await fetch('https://carauctionadmin.ezulix.com/api/buyer/account/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export const sendOtp = async (mobile) => {
  const response = await fetch(`https://carauctionadmin.ezulix.com/api/buyer/account/send-otp/${mobile}`);
  return await response.json();
};

export const verifyOtp = async (mobile, otp) => {
  const response = await fetch('https://carauctionadmin.ezulix.com/api/buyer/account/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
  });
  return await response.json();
};





// export const registerUser = async (formData) => {
//   const response = await fetch('https://carauctionadmin.ezulix.com/api/buyer/account/sign-up', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData),
//   });
//   return await response.json();
// };

// export const sendOtp = async (mobile) => {
//   const response = await fetch(`https://carauctionadmin.ezulix.com/api/buyer/account/send-otp/${mobile}`);
//   return await response.json();
// };

// export const verifyOtp = async (mobile, otp) => {
//   const response = await fetch('https://carauctionadmin.ezulix.com/api/buyer/account/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ mobile, otp }),
//   });
//   return await response.json();
// };
