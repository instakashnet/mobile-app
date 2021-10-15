import axios from "axios";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const exchangeInstance = axios.create({
  baseURL: "https://exchange-pjuon.ondigitalocean.app/exchange-service/api/v1/client",
  timeout: 30000,
});

reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);
