import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/aircnc';

import "./style.css";

export default function Dashboard() {

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user = localStorage.getItem('user');
      const res = await api.get('/dashboard', {
        headers: { user }
      });
      setSpots(res.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url("${spot.thumbnail_url}")` }} />
            <b>{spot.company}</b>
            <span>{spot.price ? `R$${spot.price}/dia` : "Gratuito"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}