

"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Upload, CheckCircle } from "lucide-react";
import { message } from "antd";

import { useAuth } from "@/context/AuthContext";
import { getUserKyc, submitKyc, uploadKycFile } from "@/services/AuthServices/AuthApiFunction";

export default function KYCModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { updateKyc } = useAuth();

  const [formData, setFormData] = useState({
    panNumber: "",
    aadharNumber: "",
    panDocumentPath: "",
    aadharDocumentPath: "",
    remark: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    panPhoto: false,
    aadharPhoto: false,
  });

  const [fileErrors, setFileErrors] = useState({
    panPhoto: "",
    aadharPhoto: "",
  });

  const [uploading, setUploading] = useState({
    panPhoto: false,
    aadharPhoto: false,
  });

  const panInputRef = useRef(null);
  const aadharInputRef = useRef(null);

  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
  const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const validExtensions = ["jpg", "jpeg", "png"];

    const fileType = file.type;
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validTypes.includes(fileType) || !validExtensions.includes(fileExtension)) {
      setUploadedFiles((prev) => ({ ...prev, [type]: false }));
      setFileErrors((prev) => ({ ...prev, [type]: "Only JPG and PNG files are allowed." }));
      e.target.value = "";
      return;
    }

    setFileErrors((prev) => ({ ...prev, [type]: "" }));
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const data = await uploadKycFile(file);

      if (data?.data?.filePath) {
        setUploadedFiles((prev) => ({ ...prev, [type]: true }));

        if (type === "panPhoto") {
          setFormData((prev) => ({ ...prev, panDocumentPath: data.data.filePath }));
        } else {
          setFormData((prev) => ({ ...prev, aadharDocumentPath: data.data.filePath }));
        }
      } else {
        throw new Error("Upload failed: No path returned");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadedFiles((prev) => ({ ...prev, [type]: false }));
      setFileErrors((prev) => ({ ...prev, [type]: "Upload failed. Try again." }));
      message.error(`Failed to upload ${type === "panPhoto" ? "PAN" : "Aadhar"} photo.`);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePAN(formData.panNumber)) {
      alert("❌ Invalid PAN number. Format should be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F).");
      return;
    }

    if (!validateAadhar(formData.aadharNumber)) {
      alert("❌ Invalid Aadhar number. It should be a 12-digit number.");
      return;
    }

    if (!uploadedFiles.panPhoto || !uploadedFiles.aadharPhoto) {
      alert("❌ Please upload both PAN and Aadhar document photos (.jpg/.png only).");
      return;
    }

    try {
      const submitBody = {
        aadhaarNumber: formData.aadharNumber,
        panNumber: formData.panNumber,
        aadhaarDocumentPath: formData.aadharDocumentPath,
        panDocumentPath: formData.panDocumentPath,
        remark: formData.remark || "",
      };

      const data = await submitKyc(submitBody);

      if (data?.success) {
        updateKyc(true);
        localStorage.setItem("kyc", "true");
        // message.success("KYC submitted successfully!");
        console.log(data);
        setIsOpen(false); // ✅ close modal after success
      } else {
        throw new Error(data.message || "Failed to submit KYC");
      }
    } catch (error) {
      console.error("Submit error:", error);
      message.error(error.message || "Error submitting KYC");
    }
  };

  useEffect(() => {
    const checkKYC = async () => {
      try {
        const res = await getUserKyc();
        const kycData = res?.data?.data;

        if (!kycData || kycData.aadhaarStatus !== 1) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error fetching KYC details:", error);
        setIsOpen(true);
      }
    };

    checkKYC();
  }, []);

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() =>{} }
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-250"
    >
      <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 transition">
        <Dialog.Title className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          KYC Verification
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-8">
   

            <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-3">
              PAN Details
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  value={formData.panNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter PAN number"
                  disabled={uploading.panPhoto}
                />
              </div>

              <div className="md:w-1/2 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
                {uploadedFiles.panPhoto ? (
                  <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>PAN Uploaded</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Upload PAN (.jpg/.png)
                    </p>
                    <input
                      type="file"
                      ref={panInputRef}
                      onChange={(e) => handleFileChange(e, "panPhoto")}
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      disabled={uploading.panPhoto}
                    />
                    <button
                      type="button"
                      onClick={() => panInputRef.current.click()}
                      className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      disabled={uploading.panPhoto}
                    >
                      {uploading.panPhoto ? "Uploading..." : "Choose File"}
                    </button>
                    {fileErrors.panPhoto && (
                      <p className="text-xs text-red-500 mt-2">{fileErrors.panPhoto}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aadhar Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-3">
              Aadhar Details
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  maxLength={12}
                  required
                  value={formData.aadharNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, aadharNumber: e.target.value.replace(/\D/g, "") })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter Aadhar number"
                  disabled={uploading.aadharPhoto}
                />
              </div>

              <div className="md:w-1/2 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
                {uploadedFiles.aadharPhoto ? (
                  <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Aadhar Uploaded</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Upload Aadhar (.jpg/.png)
                    </p>
                    <input
                      type="file"
                      ref={aadharInputRef}
                      onChange={(e) => handleFileChange(e, "aadharPhoto")}
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      disabled={uploading.aadharPhoto}
                    />
                    <button
                      type="button"
                      onClick={() => aadharInputRef.current.click()}
                      className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      disabled={uploading.aadharPhoto}
                    >
                      {uploading.aadharPhoto ? "Uploading..." : "Choose File"}
                    </button>
                    {fileErrors.aadharPhoto && (
                      <p className="text-xs text-red-500 mt-2">{fileErrors.aadharPhoto}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Optional Remark */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Remark (optional)
            </label>
            <textarea
              value={formData.remark}
              onChange={(e) => setFormData((prev) => ({ ...prev, remark: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Any additional remarks"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            disabled={uploading.aadharPhoto || uploading.panPhoto}
          >
            Submit KYC
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
