import axios from 'axios';

const tindev = axios.create({
  baseURL: "http://10.0.0.104:3003"
});

export default tindev;