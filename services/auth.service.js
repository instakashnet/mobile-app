import axios from "axios";
import { AUTH_DEV_API } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const authInstance = axios.create({
  baseURL: `${AUTH_DEV_API}/client`,
  timeout: 45000,
});

reqInterceptor(authInstance);
resInterceptor(authInstance);
