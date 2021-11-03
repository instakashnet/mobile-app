import axios from "axios";
import { DEV_API_URL } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const exchangeInstance = axios.create({
  baseURL: `${DEV_API_URL}/exchange-service/api/v1/client`,
  timeout: 45000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);
