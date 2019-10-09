import React, { useState } from 'react';
import api from '../../services/aircnc';

import './style.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await api.post('/session', { email });
    const { _id } = res.data;

    localStorage.setItem('user', _id);

    history.push("/dashboard");
  }

  return (
    <>
      <p>Ofereça <b>spots</b> para programadores e encontre <b>talentos</b> para sua empresa.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL: </label>
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="email"
          id="email"
          placeholder="Seu e-email"
        />

        <button className="btn" type="submit">Entrar</button>
      </form>

    </>
  );
}