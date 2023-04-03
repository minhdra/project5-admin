import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL + 'api';
// let BASE_API_URL = 'https://vninspect.asia/api';
const token = window.sessionStorage.getItem('USER_TOKEN');

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'auth-token': token,
    'Access-Control-Allow-Origin': '*',
  }
});

export default instance;