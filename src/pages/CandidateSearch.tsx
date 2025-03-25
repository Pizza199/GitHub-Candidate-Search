import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import "../styles/styles.css";

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [user, setUser] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    searchGithub().then((data) => {
      setUsers(data);
      searchUser(data[0]?.login);
    });
  }, []);


  const searchUser = (username: string) => {
    searchGithubUser(username).then((data) => {
      setUser(data);
    }
    );
  };

  const nextUser = () => {
    if (currentIndex === users.length - 1) {
      setShowMessage(true);
      return
    }
    if (currentIndex < users.length - 1) {
      searchUser(users[currentIndex + 1]?.login);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const saveUser = () => {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    savedUsers.push(user);
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    nextUser();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="card">
        <img src={user?.avatar_url} alt={user?.login} className="avatar" />
        <div className="card_body">
          <h4>{user?.name}({user?.login})</h4>
          <p>Location: {user?.location}</p>
          <p>Email: <a href={`mailto:${user?.email}`}>{user?.email}</a></p>
          <p>Company: {user?.company}</p>
          <p>Bio: {user?.bio}</p>
        </div>
      </div>
      <div className="button">
        <button className="minusButton" onClick={nextUser}>-</button>
        <button className="plusButton" onClick={saveUser}>+</button>
      </div>
      {showMessage && <p className="message">No more users to show</p>}
    </div>
  );
};

export default CandidateSearch;
