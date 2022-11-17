import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-motel.herokuapp.com/api',
});
export default instance;
