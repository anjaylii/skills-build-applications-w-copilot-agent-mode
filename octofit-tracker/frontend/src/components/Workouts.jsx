import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  // Codespaces endpoint example:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts

  useEffect(() => {
    fetch(`${apiBase}/api/workouts`)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id || workout.id}>{workout.name}</li>
        ))}
      </ul>
    </section>
  );
}
