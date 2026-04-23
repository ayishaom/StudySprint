import SessionRow from "./SessionRow";

function SessionList({ sessions }) {
  return (
    <div>
      <h2>Study Sessions</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Duration</th>
            <th>Focus</th>
            <th>Energy</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <SessionRow key={session._id} session={session} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SessionList;