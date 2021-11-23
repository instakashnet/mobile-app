import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

// VARIABLES
import { getVariables } from "../variables";
const { apiUrl } = getVariables();

export const accountsInstance = axios.create({
  baseURL: `${apiUrl}/accounts-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);
