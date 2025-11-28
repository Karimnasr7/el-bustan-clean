import React, { useState } from 'react';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication logic. In a real app, this would be an API call.
    // For now, we'll use a hardcoded password from environment variables.
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminToken', 'true'); // Simple token
      window.location.href = '/admin/dashboard'; // Redirect to dashboard
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول للوحة التحكم</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          دخول
        </button>
      </form>
    </div>
  );
}