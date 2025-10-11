/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const results = await fetchUserData(query, location, minRepos);
      if (results.length === 0) {
        setError("Looks like we cant find the user");
        setUsers([]);
      } else {
        setUsers(results);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <img src={user.avatar_url} alt={user.login} width={50} />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
            {user.location && <p>📍 {user.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;