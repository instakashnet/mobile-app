import axios from "axios";
import { EXCHANGE_DEV_API } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const exchangeInstance = axios.create({
  baseURL: `${EXCHANGE_DEV_API}/client`,
  timeout: 45000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);
