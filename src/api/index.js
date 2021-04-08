import axios from 'axios';

const BASE_URL: string = 'http://localhost:3005';

export const instance = axios.create({
  baseURL: BASE_URL
});


