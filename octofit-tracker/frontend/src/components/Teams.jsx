import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  // Codespaces endpoint example:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

  useEffect(() => {
    fetch(`${apiBase}/api/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.id}>{team.name}</li>
        ))}
      </ul>
    </section>
  );
}
