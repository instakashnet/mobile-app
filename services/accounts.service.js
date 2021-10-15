import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const accountsInstance = axios.create({
  baseURL: "https://accounts-service-43nnl.ondigitalocean.app/accounts-service/api/v1/client",
  timeout: 30000,
});

reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);
