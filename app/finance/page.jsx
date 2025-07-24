'use client';

import { useState } from 'react';

export default function FinanceForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    car: '',
    loanTerm: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      car: '',
      loanTerm: '',
      message: '',
    });
  };

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 lg:px-24">
      <section className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-6">Finance Application Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email Address</label>
              <input
                type="email"
                placeholder='Enter your email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder='Enter your phone number'
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Car Interested In</label>
              <input
                type="text"
                name="car"
                placeholder='Car interest'
                value={formData.car}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Preferred Loan Term</label>
            <select
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select term</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
              <option value="72">72 months</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Additional Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us anything we should know..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold rounded-lg transition"
          >
            Submit Application
          </button>
        </form>
      </section>
    </main>
  );
}
