import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import UserCard from './components/UserCard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchUser(username) {
    if (!username) return;
    setLoading(true);
    setError('');
    setUser(null);
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (res.status === 404) {
        setError('User not found');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError('Failed to fetch user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
        <p className="text-sm text-gray-600 mb-4">
          Search GitHub users by username — demo for Capstone.
        </p>

        <SearchBar onSearch={fetchUser} />

        <div className="mt-6">
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {user && <UserCard user={user} />}
        </div>

        <footer className="mt-6 text-xs text-gray-400">
          Built with React + Tailwind — Luis
        </footer>
      </div>
    </div>
  );
}
