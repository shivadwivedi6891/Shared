

import { Get, Post, PostMultipart } from "../ApiMethod";
import { AuthEndpoints, KycEndpoints, SubscriptionEndpoints } from "./AuthApiEndPoint";

export const registerUser = (data) => {

  return Post(AuthEndpoints.register, data, false); 
};


export const sendOtp = (phone) => {
  return Get(AuthEndpoints.sendOtp(phone), false);
};

// Login with OTP requires username and otp in body, no auth needed
export const loginWithOtp = (data) => {
  return Post(AuthEndpoints.login, data, false);
};





//-------------------------------------//



// Upload image (returns path)
export const uploadKycImage = (formData) => {
  // formData should be FormData instance with image file
  return PostMultipart(KycEndpoints.uploadImage, formData, true);
};


export const getUserKyc = () => {
  return Get(KycEndpoints.getKyc, true);
};



//------------------------//

export const getSubscriptionDetails = () => {
  return Get(SubscriptionEndpoints.getSubscriptionDetails);
};

// Get subscriptions of current user
export const getUserSubscriptions = () => {
  return Get(SubscriptionEndpoints.getUserSubscriptions);
};



export const subscribePlan = (subscriptionData) => {
  return Post(SubscriptionEndpoints.subscribe, subscriptionData);
};



//------------------------------------//

const BASE_URL = "https://carauctionadmin.ezulix.com/api/buyer/kyc";

// Get Token Helper
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//  Upload file (PAN / Aadhar)
export const uploadKycFile = async (file) => {
  try {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${BASE_URL}/getFileName`, {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        // No "Content-Type" → browser sets it automatically
      },
      body: fd,
    });

    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Upload API Error:", error);
    throw error;
  }
};

//  Submit KYC data
export const submitKyc = async (body) => {
  try {
    const res = await fetch(`${BASE_URL}/uploadKyc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to submit KYC");
    }

    return await res.json();
  } catch (error) {
    console.error("Submit API Error:", error);
    throw error;
  }
};


