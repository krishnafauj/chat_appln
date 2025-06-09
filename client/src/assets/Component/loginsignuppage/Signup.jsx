import  { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if(res.status === 401){
        setError('User already exists');
        navigate('/login');
        return;

      }
      if (res.status === 201) 
    {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Signup failed');

      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr  px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}

        <label className="block mb-2 text-gray-700 font-medium">Email</label>
        <input
          type="email"
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your.email@example.com"
        />

        <label className="block mb-2 text-gray-700 font-medium">Password</label>
        <input
          type="password"
          className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="Enter a secure password"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-bold ${
            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
          } transition`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <NavLink to="/login">
            <p>
                Login
            </p>
      </NavLink>
      </form>
      
    </div>
  );
}
