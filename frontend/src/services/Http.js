import axios from 'axios';

export default axios.create({
  // baseURL: 'https://covid19-db1-backend.herokuapp.com/api',
  baseURL: 'http://localhost:3000/api',
});
