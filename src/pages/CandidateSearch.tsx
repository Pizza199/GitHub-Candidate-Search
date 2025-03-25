import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);

  useEffect(() => {
    searchGithub().then((data) => {
      setUsers(data.items);
    });
  }, []);
  return (
    <div>
      <h1>Candidate Search</h1>
      <ul>
        {users.map((user) => (
          <li key={user.login}>
            <img src={user.avatar_url} alt={user.login} />
            <a href={user.html_url}>{user.login}</a>
            <p>{user.name}</p>
            <p>{user.company}</p>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <p>{user.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
