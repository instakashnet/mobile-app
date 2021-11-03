import axios from "axios";
import { DEV_API_URL } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const authInstance = axios.create({
  baseURL: `${DEV_API_URL}/auth-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance);
