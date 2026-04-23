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

  return (
    <div>
      <h1>StudySprint</h1>
      <SessionForm onSessionCreated={handleSessionCreated} />
      <SessionList sessions={sessions} />
    </div>
  );
}

export default App;