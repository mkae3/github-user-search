import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(term.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter GitHub username (e.g. torvalds)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}
