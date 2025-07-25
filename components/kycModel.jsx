'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const KYCModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    panNumber: '',
    aadharNumber: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    panPhoto: false,
    aadharPhoto: false,
  });

  const { completeKYC } = useAuth();

  const handleFileUpload = (fileType) => {
    setUploadedFiles({ ...uploadedFiles, [fileType]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.panNumber || !formData.aadharNumber) {
      alert('Please enter both PAN and Aadhar numbers.');
      return;
    }

    if (!uploadedFiles.panPhoto || !uploadedFiles.aadharPhoto) {
      alert('Please upload both PAN and Aadhar document photos.');
      return;
    }

    alert('✅ KYC submitted successfully!');
    completeKYC?.();
    localStorage.setItem('kyc_done', 'true');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6"
              >
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
                          setFormData({ ...formData, panNumber: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter PAN number"
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
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Upload PAN</p>
                          <button
                            type="button"
                            onClick={() => handleFileUpload('panPhoto')}
                            className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
                          setFormData({ ...formData, aadharNumber: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter Aadhar number"
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
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Upload Aadhar</p>
                          <button
                            type="button"
                            onClick={() => handleFileUpload('aadharPhoto')}
                            className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Submit KYC
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default KYCModal;





