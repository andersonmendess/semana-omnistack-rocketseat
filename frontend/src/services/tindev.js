import axios from 'axios';

const tindev = axios.create({
  baseURL: "http://localhost:3001"
});

export default tindev;
