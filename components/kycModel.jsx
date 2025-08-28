"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Upload, CheckCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { set, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { getUserKyc, submitKyc, uploadKycFile } from "@/services/AuthServices/AuthApiFunction";
import { useRouter } from "next/navigation";


export default function KYCModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, updateUserKycStatus, kyc } = useAuth();
  const router = useRouter();

  const [panStatus, setPanStatus] = useState(0);
  const [aadharStatus, setAadharStatus] = useState(0);
  const [panRejectionMessage, setPanRejectionMessage] = useState("");
  const [aadharRejectionMessage, setAadharRejectionMessage] = useState("");
  const [adminRemark, setAdminRemark] = useState("");


  // File state
  const [uploadedFiles, setUploadedFiles] = useState({
    panPhoto: false,
    aadharPhoto: false,
  });
  const [fileErrors, setFileErrors] = useState({ panPhoto: "", aadharPhoto: "" });
  const [uploading, setUploading] = useState({ panPhoto: false, aadharPhoto: false });

  const panInputRef = useRef(null);
  const aadharInputRef = useRef(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      panNumber: "",
      aadharNumber: "",
      remark: "",
    },
  });

  // PAN / Aadhar Validation
  const validatePAN = (val) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase());
  const validateAadhar = (val) => /^\d{12}$/.test(val);

  // File Upload
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
      const auth = localStorage.getItem("user")
      if (!auth) {
        setIsOpen(false);
        logout();
        return;
      }

    
      const data = await uploadKycFile(file);
      if (data?.data?.filePath) {
        setUploadedFiles((prev) => ({ ...prev, [type]: true }));
        setValue(
          type === "panPhoto" ? "panDocumentPath" : "aadharDocumentPath",
          data.data.filePath
        );
      }
    } catch {
      setFileErrors((prev) => ({ ...prev, [type]: "Upload failed, try again" }));
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Submit Handler
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
      
      // ⬇️ Directly set statuses to pending (your backend usually returns this)
      setPanStatus(1);
      setAadharStatus(1);

      // ⬇️ Optionally fetch latest from backend
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


  useEffect(() => {
      if(kyc){
       
        // console.log("KYC already completed",kyc);
         setIsOpen(false);

      }
  }, [kyc]);


  // Prevent modal from opening if KYC is already completed (localStorage or context)
  useEffect(() => {
    const kycLocal = localStorage.getItem("kyc");
    if (kyc === true || kycLocal === "true") {
      setIsOpen(false);
      return;
    }

    // Check if KYC already exists
    const checkKYC = async () => {
      try {
        const res = await getUserKyc();
        const kycData = res?.data?.data;

        if (kycData) {
          const panStat = kycData.panStatus;
          const aadharStat = kycData.aadhaarStatus;

          setPanStatus(panStat);
          setAadharStatus(aadharStat);
          setAdminRemark(kycData.adminRemark);

          if (panStat === 2 && aadharStat === 2) {
            //  Both verified → Close modal
            setIsOpen(false);
            updateUserKycStatus(2);
          } else {
            //  Not verified → Open modal
            setIsOpen(true);

            if (panStat === 3) {
              setPanRejectionMessage(
                kycData.adminRemark || "PAN Rejected. Please upload again."
              );
            }
            if (aadharStat === 3) {
              setAadharRejectionMessage(
                kycData.adminRemark || "Aadhar Rejected. Please upload again."
              );
            }
          }
        } else {
          //  No KYC record → Force open
          setIsOpen(true);
        }
      } catch (error) {
        setIsOpen(true);
      }
    };

    const userObj = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (!userObj) {
      setIsOpen(false);
      return;
    }
    if (!localStorage.getItem("token")) {
      setIsOpen(false);
      logout();
      return;
    }
    checkKYC();
  }, [user, logout, updateUserKycStatus, kyc]);


  useEffect(() => {
    if (panStatus === 2 && aadharStatus === 2) {
      setIsOpen(false);
    }
  }, [panStatus, aadharStatus]);



     const checkKYC = async () => {
      try {
        const res = await getUserKyc();
        const kycData = res?.data?.data;

        if (kycData) {
          const panStat = kycData.panStatus;
          const aadharStat = kycData.aadhaarStatus;

          setPanStatus(panStat);
          setAadharStatus(aadharStat);
          setAdminRemark(kycData.adminRemark);

          if (panStat === 2 && aadharStat === 2) {
            // ✅ Both verified → Close modal
            setIsOpen(false);
            window.location.reload();
            updateUserKycStatus(2);
          } else {
            //  Not verified → Open modal
            setIsOpen(true);

            if (panStat === 3) {
              setPanRejectionMessage(
                kycData.adminRemark || "PAN Rejected. Please upload again."
              );
            }
            if (aadharStat === 3) {
              setAadharRejectionMessage(
                kycData.adminRemark || "Aadhar Rejected. Please upload again."
              );
            }
          }
        } else {
          //  No KYC record → Force open
          setIsOpen(true);
        }
      } catch (error) {
        setIsOpen(true);
      }
    };

  if (!isOpen) return null;



  return (
    <Dialog
      open={isOpen}
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
            setIsOpen(false);
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