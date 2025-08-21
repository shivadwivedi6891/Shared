"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode

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
      Number(kyc.aadhaarStatus) === 1 &&
      Number(kyc.panStatus) === 1;

    // Update state
    setUser(user);
    setToken(token);
    setKyc(isKycComplete);
    setSubscription(subscription || null);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
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


// "use client";
// import React, { createContext, useState, useContext } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     if (typeof window !== "undefined") {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//     return null;
//   });

//   const [token, setToken] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token") || null;
//     }
//     return null;
//   });

//   // Automatically logout if token is missing
//   React.useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       if (!storedToken) {
//         logout();
//       }
//     }
//   }, [token]);

 
//   const [kyc, setKyc] = useState(() => {
//     if (typeof window !== "undefined") {
//       const storedKyc = localStorage.getItem("kyc");
//       return storedKyc ? JSON.parse(storedKyc) : null;
//     }
//     return null;
//   });



//   const updateKyc = (newKyc) => {
//   setKyc(newKyc);
//   const isKycComplete =
//     newKyc &&
//     Number(newKyc.aadhaarStatus) === 1 &&
//     Number(newKyc.panStatus) === 1;

//   localStorage.setItem("kyc", JSON.stringify(isKycComplete));
// };

//   const [subscription, setSubscription] = useState(() => {
//   if (typeof window !== "undefined") {
//     const storedSubscription = localStorage.getItem("subscription");
//     return storedSubscription ? JSON.parse(storedSubscription) : null;
//   }
//   return null;
// });

//   const [loading, setLoading] = useState(false);





//   const login = (loginResponse) => {

    

//   const { user, token, kyc, subscription } = loginResponse;


//   console.log("KYC from response:", kyc);
// console.log("aadhaarStatus type and value:", typeof kyc?.aadhaarStatus, kyc?.aadhaarStatus);
// console.log("panStatus type and value:", typeof kyc?.panStatus, kyc?.panStatus);

// const isKycComplete =
//   kyc &&
//   kyc.aadhaarStatus === 1 &&
//   kyc.panStatus === 1;

// console.log("Is KYC Complete?", isKycComplete);

// console.log("Login Response:", loginResponse);
// console.log("User:", user);
//   setUser(user);
//   setToken(token);
//   setKyc(kyc || null);
//   setSubscription(subscription || null);



//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("token", token);
//   localStorage.setItem("kyc", isKycComplete ? "true" : "false");
//   localStorage.setItem("subscription", JSON.stringify(subscription || null));
// };


//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setKyc(null);
//     setSubscription(null);

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("kyc");
//     localStorage.removeItem("subscription");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, kyc, login, updateKyc, logout, loading, setLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
