"use client"
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // TODO: Integrate with your email service provider's API
      // Example: await subscribeToNewsletter(email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus('success');
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <div className="flex mt-0 min-h-screen items-center justify-center  px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 md:p-12 max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Stay Updated!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Join our newsletter to receive the latest news and updates from our team.
        </p>

        {status === 'success' ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
              Thank you for subscribing!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We&lsquo;re excited to have you on board.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full transition duration-300 font-semibold disabled:opacity-50"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              {status === 'loading' ? 'Signing Up...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
