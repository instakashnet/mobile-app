import axios from "axios";
import { ACCOUNTS_DEV_API } from "@env";
import { reqInterceptor, resInterceptor } from "./interceptors";

export const accountsInstance = axios.create({
  baseURL: `${ACCOUNTS_DEV_API}/client`,
  timeout: 45000,
});

reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);
