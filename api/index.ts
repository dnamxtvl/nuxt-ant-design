import AuthService from "~/services/auth-service";
import ContractService from "~/services/contract-service";

const api = {
  auth: new AuthService(),
  contract: new ContractService('/'),
};

export default api;
