import AuthService from "~/services/auth-service";

const api = {
  auth: new AuthService('/'),
};

export default api;
