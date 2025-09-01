


// 'use client';
// import React, { createContext, useState, useContext, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// export const AuthContext = createContext();

// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.exp * 1000 < Date.now(); // exp is in seconds
//   } catch (e) {
//     return true;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [kyc, setKyc] = useState(null);
//   const [subscription, setSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load from cookies on mount
//   useEffect(() => {
//     const storedToken = Cookies.get("token");
//     const storedUser = Cookies.get("user");
//     const storedKyc = Cookies.get("kyc");
//     const storedSubscription = Cookies.get("subscription");

//     if (storedToken && !isTokenExpired(storedToken)) {
//       setToken(storedToken);
//       setUser(storedUser ? JSON.parse(storedUser) : null);
//       setKyc(storedKyc ? JSON.parse(storedKyc) : null);
//       setSubscription(storedSubscription ? JSON.parse(storedSubscription) : null);
//     } else {
//       logout();
//     }
//     setLoading(false);
//   }, []);

//   const updateKyc = (newKyc) => {
//     const isKycComplete =
//       newKyc &&
//       Number(newKyc.aadhaarStatus) === 1 &&
//       Number(newKyc.panStatus) === 1;

//     setKyc(isKycComplete);
//     Cookies.set("kyc", JSON.stringify(isKycComplete), { expires: 7 });
//     localStorage.setItem("kyc", JSON.stringify(isKycComplete));
//   };

//   const login = ({ user, token, kyc, subscription }) => {
//     // validate KYC
//     const isKycComplete =
//       kyc &&
//       Number(kyc.aadhaarStatus) === 2 &&
//       Number(kyc.panStatus) === 2;

//     const isSubscriptionActive = subscription && subscription.status === "Active";

//     setUser(user);
//     setToken(token);
//     setKyc(isKycComplete);
//     setSubscription(subscription || null);

//     // Save to cookies (7 days)
//     Cookies.set("token", token, { expires: 7 });
//     Cookies.set("user", JSON.stringify(user), { expires: 7 });
//     Cookies.set("kyc", JSON.stringify(isKycComplete), { expires: 7 });
//     Cookies.set("subscription", JSON.stringify(subscription || null), { expires: 7 });

//     // Also keep localStorage for backup (optional)
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     localStorage.setItem("kyc", JSON.stringify(isKycComplete));
//     localStorage.setItem("subscription", JSON.stringify(subscription || null));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setKyc(null);
//     setSubscription(null);

//     Cookies.remove("token");
//     Cookies.remove("user");
//     Cookies.remove("kyc");
//     Cookies.remove("subscription");

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("kyc");
//     localStorage.removeItem("subscription");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         kyc,
//         subscription,
//         login,
//         updateKyc,
//         logout,
//         loading,
//         setLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };




"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode
import Cookies from "js-cookie";

export const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // exp is in seconds
  } catch (e) {
    return true; // invalid or corrupted token
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken && !isTokenExpired(storedToken)) {
        return storedToken;
      }
      return null;
    }
    return null;
  });

  const [kyc, setKyc] = useState(() => {
    if (typeof window !== "undefined") {
      const storedKyc = localStorage.getItem("kyc");
      return storedKyc ? JSON.parse(storedKyc) : null;
    }
    return null;
  });

  const [subscription, setSubscription] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSubscription = localStorage.getItem("subscription");
      return storedSubscription ? JSON.parse(storedSubscription) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Auto-logout if token is expired or missing
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!token || isTokenExpired(token)) {
        logout();
      }
    }
  }, [token]);

  const updateKyc = (newKyc) => {
    setKyc(newKyc);
    const isKycComplete =
      newKyc &&
      Number(newKyc.aadhaarStatus) === 1 &&
      Number(newKyc.panStatus) === 1;

    localStorage.setItem("kyc", JSON.stringify(isKycComplete));
  };






  const login = (loginResponse) => {
    const { user, token, kyc, subscription } = loginResponse;

    // Validate KYC
    const isKycComplete =
      kyc &&
      Number(kyc.aadhaarStatus) === 2 &&
      Number(kyc.panStatus) === 2;

      const isSubscriptionActive = subscription && subscription.status === "Active";

    // Update state
    setUser(user);
    setToken(token);
    setKyc(isKycComplete);
    setSubscription(subscription || null);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    //  Cookies.set("token", res.token, { expires: 7 });
    localStorage.setItem("kyc", JSON.stringify(isKycComplete));
    localStorage.setItem("subscription", JSON.stringify(subscription || null));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setKyc(null);
    setSubscription(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("kyc");
    localStorage.removeItem("subscription");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        kyc,
        subscription,
        login,
        updateKyc,
        logout,
        loading,
        setLoading,
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

