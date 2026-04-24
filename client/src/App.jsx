import { useEffect, useState } from "react";
import SessionList from "./components/SessionList";
import SessionForm from "./components/SessionForm";

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error(err));
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

  return (
    <div>
      <h1>StudySprint</h1>
      <SessionForm onSessionCreated={handleSessionCreated} />
      <SessionList 
      sessions={sessions}
      onDelete={handleDeleteSession} 
      onEdit={handleEditSession}
       />
    </div>
  );
}

export default App;