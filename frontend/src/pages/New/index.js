import React, { useState, useMemo } from 'react';
import api from "../../services/aircnc";
import cameraIcon from '../../assets/camera.svg';
import "./style.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumb, setThumb] = useState(null);

  const preview = useMemo(() => (
    thumb ? URL.createObjectURL(thumb) : null
  ), [thumb]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user = localStorage.getItem('user');

    data.append('company', company);
    data.append('techs', techs);
    data.append("price", price);
    data.append("thumbnail", thumb);

    await api.post("/spot", data, {
      headers: { user }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>

      <label id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumb ? "has-thumb" : ""}
      >
        <input type="file" onChange={e => setThumb(e.target.files[0])} />
        <img src={cameraIcon} alt="Upload" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input id="company" placeholder="Sua empresa" value={company}
        onChange={(e) => setCompany(e.target.value)} />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
      <input id="techs" placeholder="Quais tecnologias" value={techs}
        onChange={(e) => setTechs(e.target.value)} />

      <label htmlFor="price">DIÁRIA <span>(em branco para GRATUITO)</span></label>
      <input id="price" placeholder="Valor cobrado por dia" value={price}
        onChange={(e) => setPrice(e.target.value)} />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}