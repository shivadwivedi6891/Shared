
"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Upload, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { getUserKyc, submitKyc, uploadKycFile } from "@/services/AuthServices/AuthApiFunction";

export default function KYCModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user,logout } = useAuth();

 


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
    if (!uploadedFiles.panPhoto || !uploadedFiles.aadharPhoto) {
      toast.error("Please upload both PAN and Aadhar photos");
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
        setIsOpen(false);
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
    const checkKYC = async () => {
      try {
        const res = await getUserKyc();
        if (!res?.data?.data || res.data.data.aadhaarStatus !== 1) {
          setIsOpen(true);
        }
      } catch {
        setIsOpen(true);
      }
    };
    checkKYC();
  }, [user]);

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
            <label className="block mb-1 text-sm font-medium">PAN Number</label>
            <input
              type="text"
              maxLength={10}
              {...register("panNumber", {
                required: "PAN is required",
                validate: (val) => validatePAN(val) || "Invalid PAN format (ABCDE1234F)",
              })}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                trigger("panNumber");
              }}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter PAN number"
            />
            {errors.panNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.panNumber.message}</p>
            )}

            {/* PAN Upload */}
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
          </div>

          {/* Aadhar Section */}
          <div>
            <label className="block mb-1 text-sm font-medium">Aadhar Number</label>
            <input
              type="text"
              maxLength={12}
              {...register("aadharNumber", {
                required: "Aadhar is required",
                validate: (val) => validateAadhar(val) || "Aadhar must be 12 digits",
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                trigger("aadharNumber");
              }}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Aadhar number"
            />
            {errors.aadharNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.aadharNumber.message}</p>
            )}

            {/* Aadhar Upload */}
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

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            disabled={uploading.panPhoto || uploading.aadharPhoto}
          >
            Submit KYC
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}



