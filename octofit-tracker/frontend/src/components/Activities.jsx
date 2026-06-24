import React, { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  // Codespaces endpoint example:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

  useEffect(() => {
    fetch(`${apiBase}/api/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id || activity.id}>
            {activity.type} - {activity.durationMinutes} min - {activity.calories} cal
          </li>
        ))}
      </ul>
    </section>
  );
}
