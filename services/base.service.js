import axios from 'axios';
import { reqInterceptor, resInterceptor } from './interceptors';

// VARIABLES
import ENV from '../variables';

export const baseInstance = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 90000,
});

reqInterceptor(baseInstance);
resInterceptor(baseInstance);
