import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api.js';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Codespaces endpoint example:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setItems(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {items.map((entry) => (
          <li key={entry._id || entry.id}>
            {entry.user?.name ?? 'Unknown'} — {entry.score} pts
          </li>
        ))}
      </ul>
    </section>
  );
}
