import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
