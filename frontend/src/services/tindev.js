import axios from 'axios';

const tindev = axios.create({
  baseURL: "http://localhost:3003"
});

export default tindev;
