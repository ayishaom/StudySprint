import { useEffect, useState } from "react";
import SessionList from "./components/SessionList";
import SessionForm from "./components/SessionForm";

function App() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focusFilter, setFocusFilter] = useState("")

 useEffect(() => {
  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/api/sessions");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch sessions");
      }

      setSessions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchSessions();

  const interval = setInterval(fetchSessions, 5000);

  return () => clearInterval(interval);
}, []);

  const handleSessionCreated = (newSession) => {
    setSessions((prev) => [...prev, newSession]);
  };

  const handleDeleteSession = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this session?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/sessions/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete session");
    }

    setSessions((prev) => prev.filter((session) => session._id !== id));
  } catch (error) {
    console.error(error.message);
  }
};

const handleEditSession = async (session) => {
  const newDuration = prompt("Enter new duration:", session.duration);
  const newFocusLevel = prompt("Enter new focus level:", session.focusLevel);
  const newEnergyLevel = prompt("Enter new energy level:", session.energyLevel);

  if (!newDuration || !newFocusLevel || !newEnergyLevel) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/sessions/${session._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        duration: Number(newDuration),
        focusLevel: Number(newFocusLevel),
        energyLevel: Number(newEnergyLevel),
      }),
    });

    const updatedSession = await response.json();

    if (!response.ok) {
      throw new Error(updatedSession.error || "Failed to update session");
    }

    setSessions((prev) =>
      prev.map((item) =>
        item._id === updatedSession._id ? updatedSession : item
      )
    );
  } catch (error) {
    console.error(error.message);
  }
};

const filteredSessions = focusFilter
? sessions.filter((session) => session.focusLevel === Number(focusFilter))
: sessions;

  return (
  <div>
    <h1>StudySprint</h1>

    {loading && sessions.length === 0 && <p>Loading sessions...</p>}
    {error && <p style={{ color: "red" }}>Error: {error}</p>}

    <SessionForm onSessionCreated={handleSessionCreated} />
    <div>
      <label>
        Filter by focus level: {" "}
        <select 
        value={focusFilter}
        onChange={(e) => setFocusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>

    <SessionList
      sessions={filteredSessions}
      onDelete={handleDeleteSession}
      onEdit={handleEditSession}
    />
  </div>
);
}

export default App;