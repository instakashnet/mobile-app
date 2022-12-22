import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

// VARIABLES
import ENV from "../variables";

export const authInstance = axios.create({
  baseURL: `${ENV.apiUrl}/auth-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance);
