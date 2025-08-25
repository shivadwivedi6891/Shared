"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Upload, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { getUserKyc, submitKyc, uploadKycFile } from "@/services/AuthServices/AuthApiFunction";
import { useRouter } from "next/navigation";


export default function KYCModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user,logout,updateUserKycStatus } = useAuth();
  const router = useRouter();

  const [panStatus, setPanStatus] = useState(0);
  const [aadharStatus, setAadharStatus] = useState(0);
  const [panRejectionMessage, setPanRejectionMessage] = useState("");
  const [aadharRejectionMessage, setAadharRejectionMessage] = useState("");


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
      if(!auth) {
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
        router.push('/');
        setIsOpen(false);
          router.push('/auction');
      
     
       
      } else {
        throw new Error(res.message || "KYC failed");
      }
    } catch (err) {
      toast.error(err.message || "Error submitting KYC");
    }
  };

  // Check if KYC already exists
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (!user) {
      setIsOpen(false);
      return;
    }

    if (!localStorage.getItem("token")) {
      setIsOpen(false);
      logout();
      return;
    }

    const checkKYC = async () => {
      try {
        const res = await getUserKyc();
        const kycData = res?.data?.data;

        if (kycData) {
          const panStat = kycData.panStatus;
          const aadharStat = kycData.aadhaarStatus;

          setPanStatus(panStat);
          setAadharStatus(aadharStat);

          if (panStat === 2 && aadharStat === 2) {
            setIsOpen(false);
            updateUserKycStatus(2);
          } else {
            setIsOpen(true);
            if (panStat === 1) {
              setPanRejectionMessage(kycData.panRejectionReason || "PAN Rejected. Please upload again.");
            }
            if (aadharStat === 1) {
              setAadharRejectionMessage(kycData.aadhaarRejectionReason || "Aadhar Rejected. Please upload again.");
            }
          }
        } else {
          setIsOpen(true);
        }
      } catch (error) {
        setIsOpen(true);
      }
    };

    checkKYC();
  }, [user, logout, updateUserKycStatus]);

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Background Blur */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white text-black p-6 shadow-xl transition">
        <Dialog.Title className="text-2xl font-bold text-center mb-6">
          KYC Verification
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
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" /> <span>PAN Uploaded</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => panInputRef.current?.click()}
                        className="px-4 py-1 bg-blue-600 text-white rounded"
                      >
                        {uploading.panPhoto ? "Uploading..." : "Choose File"}
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
                        <div className="flex items-center justify-center text-green-600">
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
          <div>
            <label className="block mb-1 text-sm font-medium">Remark (optional)</label>
            <textarea
              {...register("remark")}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Any additional remarks"
              rows={3}
            />
          </div>

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
