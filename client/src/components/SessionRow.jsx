function SessionRow({ session }) {
  return (
    <tr>
      <td>{session.subjectId}</td>
      <td>{session.duration}</td>
      <td>{session.focusLevel}</td>
      <td>{session.energyLevel}</td>
      <td>{new Date(session.date).toLocaleDateString()}</td>
    </tr>
  );
}

export default SessionRow;