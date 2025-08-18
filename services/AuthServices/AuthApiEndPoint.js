export const AuthEndpoints = {
  register: "/api/buyer/account/sign-up", 
   sendOtp: (phone) => `/api/buyer/account/send-otp/${phone}`,
  login: "/api/buyer/account/login",
  
};

export const KycEndpoints = {
  uploadImage: "/api/buyer/kyc/getFileName",  // POST multipart/form-data
  submitKyc: "/api/buyer/kyc/uploadKyc", 
  getKyc:"/api/buyer/kyc/getKycDetails"  
        // POST JSON with KYC body
};



export const SubscriptionEndpoints = {
  getSubscriptionDetails: "/api/buyer/subscription/getSubscriptionDetails",  // GET all plans
  getUserSubscriptions: "/api/buyer/subscription/getUserSubscriptions",      // GET user subscriptions
  subscribe: "/api/buyer/subscription/subscribe",                            // POST subscribe
};






