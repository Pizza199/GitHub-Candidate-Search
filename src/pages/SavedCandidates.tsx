import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [users, setUsers] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setUsers(savedUsers);
  }, []);

  function handleReject(index: number) {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    savedUsers.splice(index, 1);
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    setUsers(savedUsers);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td><img src={user.avatar_url} alt={user.login} className="table-avatar" /></td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.bio}</td>
              <td><button className="minusButton" onClick={() => handleReject(index)}>-</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
