import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Codespaces endpoint example:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

  useEffect(() => {
    fetch(`${apiBase}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id || user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </section>
  );
}
