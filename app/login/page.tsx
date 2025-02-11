// app/login/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Retrieve registration success message if exists
    const storedMessage = localStorage.getItem('registrationMessage');
    if (storedMessage) {
      setMessage(storedMessage);
      localStorage.removeItem('registrationMessage'); // Remove after displaying
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push('/protected/dashboard'); // Redirect after successful login
      router.refresh(); // Refresh the page to update auth state
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Login</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-2">
            <a href="/register" className='text-blue-500 hover:underline'> Create an account </a>
            <a href="/forgot-password" className='text-blue-500 hover:underline'> Forgor password</a>
        </div>
      </div>
    </div>
  );
}
