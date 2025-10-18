import React from 'react';

export default function UserCard({ user }) {
  return (
    <div className="mt-4 border rounded-lg p-4 flex gap-4 items-center">
      <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
      <div>
        <h2 className="font-semibold text-lg">{user.name || user.login}</h2>
        <p className="text-sm text-gray-600">@{user.login}</p>
        {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
        <div className="mt-2 text-sm">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
