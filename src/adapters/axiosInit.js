import axios from 'axios';

export const APIClient = axios.create({
  timeout: 8000,
});
