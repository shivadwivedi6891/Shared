


"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode
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
  const [subscriptionApproved, setSubscriptionApproved] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSubscription = localStorage.getItem("subscription");
      if (storedSubscription) {
        const sub = JSON.parse(storedSubscription);
        return sub && sub.status === "Approved";
      }
    }
    return false;
  });

  const [subscriptionPending, setSubscriptionPending] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSubscription = localStorage.getItem("subscription");
      if (storedSubscription) {
        const sub = JSON.parse(storedSubscription);
        return sub && sub.status === "Pending";
      }
    }
    return false;
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

    const isSubscriptionApproved = subscription && subscription.status === "Approved";
    const isSubscriptionPending = subscription && subscription.status === "Pending";

    // Update state
    setUser(user);
    setToken(token);
    setKyc(isKycComplete);
    setSubscription(subscription || null);
    setSubscriptionApproved(isSubscriptionApproved);
    setSubscriptionPending(isSubscriptionPending);



    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    //  Cookies.set("token", res.token, { expires: 7 });
    localStorage.setItem("kyc", JSON.stringify(isKycComplete));
    localStorage.setItem("subscription", JSON.stringify(subscription || null));
    localStorage.setItem("subscriptionApproved", isSubscriptionApproved);
  };

  const logout = () => {
    // Clear token cookie globally on logout
    if (typeof window !== "undefined") {
      try {
        const Cookies = require('js-cookie');
        Cookies.remove("token", { path: "/" });
      } catch (e) { }
    }
    setUser(null);
    setToken(null);
    setKyc(null);
    setSubscription(null);
    setSubscriptionApproved(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("kyc");
    localStorage.removeItem("subscription");
    localStorage.removeItem("subscriptionApproved");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        kyc,
        subscription,
        subscriptionApproved,
        subscriptionPending,
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

