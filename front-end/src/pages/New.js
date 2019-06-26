import React, { Component } from 'react';
import api from '../services/api';

import './New.css'

class New extends Component {

  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hastags: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hastags', this.state.hastags);

    await api.post('posts', data);

    this.props.history.push('/');
  }

  render() {
    return (
      <form id='new-post'>
        <input type='file' onChange={this.handleImageChange} />

        <input
          type='text'
          name='author'
          placeholder='Author'
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type='text'
          name='place'
          placeholder='Place'
          onChange={this.handleChange}
          value={this.state.place}
        />

        <input
          type='text'
          name='description'
          placeholder='Description'
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type='text'
          name='hastags'
          placeholder='Hastags'
          onChange={this.handleChange}
          value={this.state.hastags}
        />

        <button onClick={this.handleSubmit} type='submit'>Send</button>

      </form>
    );
  }
}

export default New;