import React, { useEffect, useState } from 'react';
import tindevService from '../../services/tindev';

import { Link } from 'react-router-dom';

import likeIcon from '../../assets/like.svg';
import disLikeIcon from '../../assets/dislike.svg';

import logo from '../../assets/logo.svg';
import './styles.css';

export default function Home({ match }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await tindevService.get('/dev', {
        headers: { user: match.params.id }
      });

      setUsers(res.data);
    }

    loadUsers();
  }, [match.params.id]);

  async function like(id) {
    await tindevService.post(`/dev/${id}/like`, null, { headers: { user: match.params.id } });

    setUsers(users.filter(u => u._id !== id));
  }

  async function dislike(id) {
    await tindevService.post(`/dev/${id}/dislike`, null, { headers: { user: match.params.id } });

    setUsers(users.filter(u => u._id !== id));
  }

  return (
    <div className='main-container'>
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio || 'No description'}</p>
              </footer>
              <div className='buttons'>
                <button onClick={() => dislike(user._id)} type='button'>
                  <img src={disLikeIcon} alt="dislike" />
                </button>
                <button onClick={() => like(user._id)} type='button'>
                  <img src={likeIcon} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">
            Acabou :C
          </div>
        )}
    </div>
  );
}
