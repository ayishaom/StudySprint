import { useEffect, useState } from "react";
import SessionList from "./components/SessionList";

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>StudySprint</h1>
      <SessionList sessions={sessions} />
    </div>
  );
}

export default App;