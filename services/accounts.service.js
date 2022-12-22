import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

// VARIABLES
import ENV from "../variables";

export const accountsInstance = axios.create({
  baseURL: `${ENV.apiUrl}/accounts-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);
