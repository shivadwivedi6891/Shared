'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (showPasswordForm && newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    console.log({
      name,
      email,
      password,
      notifications,
      oldPassword,
      newPassword,
    });

    alert('Settings saved successfully!');

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
  };

  return (
    <main className="min-h-screen py-16 px-6 sm:px-10 lg:px-32 bg-gray-100 text-black dark:bg-black dark:text-white transition-colors">
      <h1 className="text-4xl font-bold mb-10 text-center">Settings</h1>

      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Profile Section */}
        <section className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-300 dark:border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">Full Name</label>
              <input
                type="text"
                className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">Email</label>
              <input
                type="email"
                className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-300 dark:border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

          {!showPasswordForm ? (
            <div className="text-right">
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition shadow"
              >
                Change Password
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">Old Password</label>
                <input
                  type="password"
                  className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">New Password</label>
                <input
                  type="password"
                  className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-400">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}
        </section>
        <section className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-300 dark:border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Enable Notifications</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-purple-600"
              />
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold rounded-lg transition shadow-lg hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
