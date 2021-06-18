import axios from 'axios';

import { API_URL } from "../enviroment";

export const instance = axios.create({
  baseURL: API_URL
});



