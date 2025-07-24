'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    console.log({
      name,
      email,
      password,
      notifications,
      darkMode
    });
    alert('Settings saved successfully!');
  };

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6 sm:px-10 lg:px-32">
      <h1 className="text-4xl font-bold mb-10 text-center">Settings</h1>

      <div className="space-y-10 max-w-3xl mx-auto">
       
        <section className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">Email</label>
              <input
                type="email"
                className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-400">New Password</label>
              <input
                type="password"
                className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Enable Notifications</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                claassName="w-5 h-5"
              />
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
