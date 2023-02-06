import axios from 'axios';
import { reqInterceptor, resInterceptor } from './interceptors';

// VARIABLES
import ENV from '../variables';

export const exchangeInstance = axios.create({
  baseURL: `${ENV.apiUrl}/exchange-service/api/v1/client`,
  timeout: 40000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);
