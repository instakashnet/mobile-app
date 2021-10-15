import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const authInstance = axios.create({
  baseURL: "https://authentication-service-mznec.ondigitalocean.app/auth-service/api/v1/client",
  timeout: 30000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance);
