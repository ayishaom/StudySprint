import { useState } from "react";

function SessionForm({ onSessionCreated }) {
  const [formData, setFormData] = useState({
    userId: "",
    subjectId: "",
    goal: "",
    duration: "",
    focusLevel: "",
    energyLevel: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          duration: Number(formData.duration),
          focusLevel: Number(formData.focusLevel),
          energyLevel: Number(formData.energyLevel),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create session");
      }

      onSessionCreated(data);

      setFormData({
        userId: "",
        subjectId: "",
        goal: "",
        duration: "",
        focusLevel: "",
        energyLevel: "",
        date: "",
      });
    } catch (error) {
      console.error("Error creating session:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Study Session</h2>

      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
      />

      <input
        type="text"
        name="subjectId"
        placeholder="Subject ID"
        value={formData.subjectId}
        onChange={handleChange}
      />

      <input 
      type="text"
      name="goal"
      placeholder="Session Goal"
      value={formData.goal}
      onChange={handleChange}     
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      />

      <input
        type="number"
        name="focusLevel"
        placeholder="Focus Level (1-5)"
        value={formData.focusLevel}
        onChange={handleChange}
      />

      <input
        type="number"
        name="energyLevel"
        placeholder="Energy Level (1-5)"
        value={formData.energyLevel}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit">Add Session</button>
    </form>
  );
}

export default SessionForm;