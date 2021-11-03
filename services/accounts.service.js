import axios from "axios";
import { DEV_API_URL } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const accountsInstance = axios.create({
  baseURL: `${DEV_API_URL}/accounts-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);
