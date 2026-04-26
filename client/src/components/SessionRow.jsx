function SessionRow({ session, onDelete, onEdit }) {
  return (
    <tr>
      <td>{session.subjectId}</td>
      <td>{session.goal}</td>
      <td>{session.duration}</td>
      <td>{session.focusLevel}</td>
      <td>{session.energyLevel}</td>
      <td>{new Date(session.date).toLocaleDateString()}</td>
      <td>
        <button onClick={() => onEdit(session)}>Edit</button>
        <button onClick={() => onDelete(session._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default SessionRow;