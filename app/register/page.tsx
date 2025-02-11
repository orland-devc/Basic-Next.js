'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          name: formData.get('name'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store the success message in localStorage
      localStorage.setItem('registrationMessage', data.message);

      // Redirect to login after successful registration
      router.push('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Register</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-gray-700"
            />
          </div>
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
            Register
          </button>
        </form>

        <div className="flex justify-between mt-2">
          <a href="/login" className='text-blue-500 underline'>Already have an account?</a>
        </div>
      </div>
    </div>
  );
}
