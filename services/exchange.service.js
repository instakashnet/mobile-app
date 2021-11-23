import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

// VARIABLES
import { getVariables } from "../variables";
const { apiUrl } = getVariables();

export const exchangeInstance = axios.create({
  baseURL: `${apiUrl}/exchange-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);
