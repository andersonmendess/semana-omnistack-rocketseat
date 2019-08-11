import React, { useState } from 'react';
import tindevService from '../../services/tindev';

import logo from '../../assets/logo.svg';
import './styles.css'

export default function Login({ history }) {

  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await tindevService.post('/dev', { username });

    const { _id } = res.data;

    history.push(`/home/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuario do github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" >Entrar</button>
      </form>
    </div>
  )
}
