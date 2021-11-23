import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

// VARIABLES
import { getVariables } from "../variables";
const { apiUrl } = getVariables();

export const authInstance = axios.create({
  baseURL: `${apiUrl}/auth-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance);
