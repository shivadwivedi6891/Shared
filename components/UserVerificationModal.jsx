// UserVerificationModal.jsx
// This component manages the unified modal logic for KYC and premium subscription verification.
// It handles KYC document upload, verification status, error handling, and premium subscription flow.

"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Upload, CheckCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { getUserKyc, submitKyc, uploadKycFile, getUserSubscriptions } from "@/services/AuthServices/AuthApiFunction";
import { useRouter, usePathname } from "next/navigation";

// Main modal component for user verification
export default function UserVerificationModal() {
  // KYC State
  // kycOpen: controls KYC modal visibility
  // kycLoading: loading state for KYC API
  // kycError: error message for KYC
  // panStatus/aadharStatus: status codes for PAN/Aadhar verification
  // panRejectionMessage/aadharRejectionMessage: admin rejection messages
  // adminRemark: admin remarks for KYC
  // uploadedFiles: tracks uploaded PAN/Aadhar files
  // fileErrors: error messages for file uploads
  // uploading: loading state for file uploads
  // panInputRef/aadharInputRef: refs for file inputs
  const [kycOpen, setKycOpen] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const [kycError, setKycError] = useState("");
  const [panStatus, setPanStatus] = useState(0);
  const [aadharStatus, setAadharStatus] = useState(0);
  const [panRejectionMessage, setPanRejectionMessage] = useState("");
  const [aadharRejectionMessage, setAadharRejectionMessage] = useState("");
  const [adminRemark, setAdminRemark] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({ panPhoto: false, aadharPhoto: false });
  const [fileErrors, setFileErrors] = useState({ panPhoto: "", aadharPhoto: "" });
  const [uploading, setUploading] = useState({ panPhoto: false, aadharPhoto: false });
  const panInputRef = useRef(null);
  const aadharInputRef = useRef(null);
  const { register, handleSubmit, setValue, formState: { errors }, trigger } = useForm({ mode: "onChange", defaultValues: { panNumber: "", aadharNumber: "", remark: "" } });
  const validatePAN = (val) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase());
  const validateAadhar = (val) => /^\d{12}$/.test(val);

  // Premium State
  // premiumOpen: controls premium modal visibility
  // premiumLoading: loading state for premium API
  // premiumError: error message for premium
  // subscriptionStatus: current subscription status
  // subscriptionRemark: admin remark for subscription
  // step: current step in premium modal flow
  // selectedPlan: selected premium plan
  // plans: available premium plans
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumError, setPremiumError] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionRemark, setSubscriptionRemark] = useState("");
  const [step, setStep] = useState("plans");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [{ name: "Premium", price: "₹999 / Year", id: "premium", numericAmount: 999 }];

  // Auth & Routing
  // user, token, logout, updateUserKycStatus, kyc: from AuthContext
  // router: Next.js router
  // pathname: current route
  const { user, token, logout, updateUserKycStatus, subscriptionApproved, kyc, subscriptionPending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log("KYC STATUS", kyc)
  console.log("SUBSCRIPTION STATUS", subscriptionApproved)
  console.log("pending", subscriptionPending)

  // KYC File Upload handler
  // Handles file validation, upload, and state updates
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setFileErrors((prev) => ({ ...prev, [type]: "Only JPG/PNG allowed" }));
      e.target.value = "";
      return;
    }
    setFileErrors((prev) => ({ ...prev, [type]: "" }));
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const auth = localStorage.getItem("user");
      if (!auth) {
        setKycOpen(false);
        logout();
        return;
      }
      const data = await uploadKycFile(file);
      if (data?.data?.filePath) {
        setUploadedFiles((prev) => ({ ...prev, [type]: true }));
        setValue(type === "panPhoto" ? "panDocumentPath" : "aadharDocumentPath", data.data.filePath);
      }
    } catch {
      setFileErrors((prev) => ({ ...prev, [type]: "Upload failed, try again" }));
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // KYC Submit handler
  // Submits KYC form data to API and updates state
  const onSubmit = async (formData) => {
    if ((panStatus !== 2 && !uploadedFiles.panPhoto) || (aadharStatus !== 2 && !uploadedFiles.aadharPhoto)) {
      toast.error("Please upload the required documents.");
      return;
    }
    try {
      const res = await submitKyc({
        aadhaarNumber: formData.aadharNumber,
        panNumber: formData.panNumber,
        aadhaarDocumentPath: formData.aadharDocumentPath,
        panDocumentPath: formData.panDocumentPath,
        remark: formData.remark || "",
      });
      if (res?.success) {
        toast.success("KYC submitted successfully!");
        setPanStatus(1);
        setAadharStatus(1);
        const kycRes = await getUserKyc();
        const kycData = kycRes?.data?.data;
        if (kycData) {
          setPanStatus(kycData.panStatus);
          setAadharStatus(kycData.aadhaarStatus);
          setAdminRemark(kycData.adminRemark || "");
        }
      } else {
        throw new Error(res.message || "KYC failed");
      }
    } catch (err) {
      toast.error(err.message || "Error submitting KYC");
    }
  };

  // KYC Check handler
  // Checks KYC status from API and updates modal state
  const checkKYC = async () => {
    if (kyc) {
      setKycOpen(false);
      //   updateUserKycStatus(2);
      checkPremium();
      return;
    }
    setKycLoading(true);
    setKycError("");
    try {
      const res = await getUserKyc();
      const kycData = res?.data?.data;
      if (kycData) {
        setPanStatus(kycData.panStatus);
        setAadharStatus(kycData.aadhaarStatus);
        setAdminRemark(kycData.adminRemark);
        if (kycData.panStatus === 2 && kycData.aadhaarStatus === 2) {
          setKycOpen(false);
          updateUserKycStatus(2);
          checkPremium();
        } else {
          setKycOpen(true);
          if (kycData.panStatus === 3) setPanRejectionMessage(kycData.adminRemark || "PAN Rejected. Please upload again.");
          if (kycData.aadhaarStatus === 3) setAadharRejectionMessage(kycData.adminRemark || "Aadhar Rejected. Please upload again.");
        }
      } else {
        setKycOpen(true);
      }
    } catch (error) {
      setKycError("Unable to fetch KYC details. Please check your connection or try again.");
      setKycOpen(false);
      checkPremium();
    } finally {
      setKycLoading(false);
    }
  };

  // Premium Check handler
  // Checks premium subscription status from API and updates modal state
  const checkPremium = async () => {
    if (subscriptionApproved) {
      setPremiumOpen(false);
      setPremiumLoading(false);
      return;
    }
    setPremiumLoading(true);
    setPremiumError("");
    try {
      const res = await getUserSubscriptions();
      const subscriptionList = res?.data?.data || [];
      if (subscriptionList.length === 0) {
        setPremiumOpen(true);
        setSubscriptionStatus(null);
      } else {
        const subscriptionData = subscriptionList[0];
        setSubscriptionStatus(subscriptionData.status);
        setSubscriptionRemark(subscriptionData.remark || "");
        if (subscriptionData.status === "Pending") {
          setPremiumOpen(true);
        } else if (subscriptionData.status === "Rejected") {
          setPremiumOpen(true);
        } else if (subscriptionData.status === "Success") {
          setPremiumOpen(false);
        } else {
          setPremiumOpen(false);
        }
      }
    } catch (error) {
      setPremiumError("Unable to fetch premium details. Please check your connection or try again.");
      setPremiumOpen(true);
    } finally {
      setPremiumLoading(false);
    }
  };

  // On mount & route change, check KYC and premium status
  useEffect(() => {
    const allowlist = ["/BankAccount", "/checkout", "/payment-success"];
    if (allowlist.includes(pathname)) {
      setKycOpen(false);
      setPremiumOpen(false);
      return;
    }
    if (user && token) {
      checkKYC();
    } else {
      setKycOpen(false);
      setPremiumOpen(false);
    }
  }, [pathname, user, token]);

  // KYC Modal UI rendering
  if (kycLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Checking your KYC status...</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Please wait while we verify your KYC details.</p>
          {kycError && (
            <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
              {kycError}
              <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={checkKYC}>Retry</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (kycOpen) {
    return (
      <Dialog
        open={kycOpen}
        onClose={() => { }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Background Blur */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white text-black p-6 shadow-xl transition">
          <button
            type="button"
            onClick={() => {
              logout();
              // setIsOpen(false);
            }}
            className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            KYC Verification
            <button
              type="button"
              onClick={async () => {
                await checkKYC();
                if (panStatus === 2 && aadharStatus === 2) {
                  setKycOpen(false);
                  updateUserKycStatus(2);
                  checkPremium();
                  // window.location.reload();
                  console.log("KYC verified, closing modal");
                  router.refresh();
                }
              }}
              className="ml-2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
              title="Refresh KYC Status"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1 0 19 5" />
              </svg>
            </button>
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* PAN Section */}
            <div>
              <label className="block mb-1 text-sm font-medium">PAN Verification</label>
              {panStatus === 1 ? (
                <div className="text-center p-4 border-2 border-dashed rounded-lg">
                  <p className="text-yellow-600 font-semibold">Your PAN verification is pending.</p>
                </div>
              ) : panStatus === 2 ? (
                <div className="text-center p-4 border-2 border-dashed rounded-lg">
                  <p className="text-green-600 font-semibold">Your PAN is verified.</p>
                </div>
              ) : (
                <>
                  {panStatus === 3 && <p className="text-red-500 text-center mb-2">{panRejectionMessage}</p>}
                  <input
                    type="text"
                    maxLength={10}
                    {...register("panNumber", {
                      required: "PAN is required",
                      validate: (val) => validatePAN(val) || "Invalid PAN format (ABCDE1234F)",
                    })}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setValue("panNumber", value, { shouldValidate: true });
                      trigger("panNumber");
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter PAN number"
                  />
                  {errors.panNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.panNumber.message}</p>
                  )}

                  <div className="mt-3 border-2 border-dashed rounded-lg p-4 text-center">
                    {uploadedFiles.panPhoto ? (
                      <div className="flex items-center justify-center text-yellow-600">
                        <CheckCircle className="h-5 w-5 mr-2" /> <span>PAN Uploaded</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => {
                            if (panStatus === 3) {
                              setPanStatus(0);
                            }
                            panInputRef.current?.click();
                          }}
                          className="px-4 py-1 bg-blue-600 text-white rounded"
                        >
                          {uploading.panPhoto ? "Uploading..." : "chose File"}
                        </button>
                        <input
                          type="file"
                          ref={panInputRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "panPhoto")}
                        />
                        {fileErrors.panPhoto && (
                          <p className="text-xs text-red-500 mt-2">{fileErrors.panPhoto}</p>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Aadhar Section */}
            <div>
              <label className="block mb-1 text-sm font-medium">Aadhar Verification</label>
              {aadharStatus === 1 ? (
                <div className="text-center p-4 border-2 border-dashed rounded-lg">
                  <p className="text-yellow-600 font-semibold">Your Aadhar verification is pending.</p>
                </div>
              ) : aadharStatus === 2 ? (
                <div className="text-center p-4 border-2 border-dashed rounded-lg">
                  <p className="text-green-600 font-semibold">Your Aadhar is verified.</p>
                </div>
              ) : (
                <>
                  {aadharStatus === 3 && <p className="text-red-500 text-center mb-2">{aadharRejectionMessage}</p>}
                  <input
                    type="text"
                    maxLength={12}
                    {...register("aadharNumber", {
                      required: "Aadhar is required",
                      validate: (val) => validateAadhar(val) || "Aadhar must be 12 digits",
                    })}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setValue("aadharNumber", value, { shouldValidate: true });
                      trigger("aadharNumber");
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter Aadhar number"
                  />
                  {errors.aadharNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.aadharNumber.message}</p>
                  )}

                  <div className="mt-3 border-2 border-dashed rounded-lg p-4 text-center">
                    {uploadedFiles.aadharPhoto ? (
                      <div className="flex items-center justify-center text-yellow-600">
                        <CheckCircle className="h-5 w-5 mr-2" /> <span>Aadhar Uploaded</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => aadharInputRef.current?.click()}
                          className="px-4 py-1 bg-blue-600 text-white rounded"
                        >
                          {uploading.aadharPhoto ? "Uploading..." : "Choose File"}
                        </button>
                        <input
                          type="file"
                          ref={aadharInputRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "aadharPhoto")}
                        />
                        {fileErrors.aadharPhoto && (
                          <p className="text-xs text-red-500 mt-2">{fileErrors.aadharPhoto}</p>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Remark */}
            {(panStatus === 3 || aadharStatus === 3) && (
              <div>
                <label className="block mb-1 text-sm font-medium">Admin Remark</label>
                <textarea
                  readOnly
                  value={adminRemark}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  rows={3}
                />
              </div>
            )}




            {!(panStatus === 1 && aadharStatus === 1) && (
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                disabled={uploading.panPhoto || uploading.aadharPhoto || (panStatus === 2 && aadharStatus === 2)}
              >
                Submit KYC
              </button>
            )}
          </form>
        </Dialog.Panel>

      </Dialog>
    );
  }

  // Premium Modal UI rendering
  if (premiumLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Checking your Premium status...</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Please wait while we verify your premium details.</p>
          {premiumError && (
            <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
              {premiumError}
              <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={checkPremium}>Retry</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (premiumOpen) {
    return (
      <>
        {/* Overlay: covers everything except navbar */}
        <div
          className="fixed left-0 right-0 z-50 bg-black/70 backdrop-blur-sm"
          style={{ top: 0, bottom: 0, pointerEvents: 'auto' }}
        />
        {step === "plans" && subscriptionStatus === "Rejected" && (
          <div
            className="fixed left-0 right-0 z-[51] flex items-center justify-center"
            style={{ top: 0, bottom: 0 }}
          >
            <div className="relative bg-red-100 text-black-900 dark:bg-red-900 dark:text-red-100 w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-red-300 dark:border-red-700">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="absolute top-4 right-4 p-2 text-red-900 rounded-full bg-black"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold">Premium Subscription Rejected</h3>
              <p className="text-sm">
                {subscriptionRemark ? subscriptionRemark : "Your subscription was rejected by admin."}
              </p>
              <button
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition mt-4"
                onClick={() => handlePlanSelect(plans[0])}
              >
                Re-Apply for Premium
              </button>
            </div>
          </div>
        )}

        {step === "plans" && subscriptionStatus === "Pending" && (
          <div
            className="fixed left-0 right-0 z-[51] flex items-center justify-center"
            style={{ top: 0, bottom: 0 }}
          >
            <div className="relative bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100 w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-yellow-300 dark:border-yellow-700">
              <button
                type="button"
                onClick={() => {
                  logout();
                  // setOpen(false);
                }}
                className="absolute top-4 right-4 p-2 text-black-900 rounded-fullbg-yellow-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <CheckCircle className="text-yellow-500 w-12 h-12 mx-auto" />
              <h3 className="text-2xl font-bold">Premium Membership Pending</h3>
              <p className="text-sm">
                Your payment is being processed. Please wait for admin approval.<br />
                You will be notified once your premium membership is activated.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1 0 19 5" />
                </svg>
                Refresh Status
              </button>
              <button
                className="w-full py-3 bg-yellow-400 text-white rounded-xl font-semibold opacity-50 cursor-not-allowed mt-2"
                disabled
              >
                Pending
              </button>
            </div>
          </div>
        )}

        {step === "plans" && (!subscriptionStatus || subscriptionStatus !== "Pending") && (
          <div
            className="fixed left-0 right-0 z-[51] flex items-center justify-center"
            style={{ top: 0, bottom: 0 }}
          >
            <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-10 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-white/10 space-y-6 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  logout();

                }}
                className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Upgrade Your Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Unlock exclusive features, early access to auctions, and
                  priority support by becoming a premium member.
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => router.push("/BankAccount")}
                    className="px-4 py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition shadow-md">
                    <div className="text-lg font-bold mb-1">{plan.name}</div>
                    <div className="text-sm">{plan.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div
            className="fixed left-0 right-0 z-[51] flex items-center justify-center"

            
            style={{ top: 0, bottom: 0 }}
          >
            <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  logout();
                  // setOpen(false);
                }}
                className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="text-2xl font-bold">Premium Membership Activated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Thank you! Redirecting you to explore premium auctions...
              </p>
            </div>
          </div>



        )

        }

      </>
    );
  }

  return null;
}
