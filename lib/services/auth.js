import BaseAPIClient from "../apiClientBase"
import BsCoreApiClient from "../bsCoreApiClient"
import LocalStorageSvc from  "./localStorage"

class Auth {
  constructor(constants, interceptor) {
    this.constants = constants;
    this.identityClient = new BaseAPIClient.BaseAPIClient({
      baseURL: constants.BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
    });
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = {
      login: "/auth/login",
      logout: "/auth/logout",
      resetpassword: "/auth/password",
    };
  }

  getJWTToken() {
    return LocalStorageSvc.getItem("token");
  }

  getOptions() {
    const options = {
      authToken: this.getToken(),
    };
    return options;
  }

  getToken() {
    const token = this.getJWTToken();
    const jwtToken = token ? token : "";
    return jwtToken;
  }

  login(username, password,roles) {
    let { ACCOUNT_ID } = this.constants;
    return new Promise((resolve, reject) => {
      let payload = {
        account_id: ACCOUNT_ID,
        username,
        password,
        roles
      };
      this.bsCoreApiClient.clientApiProvider
        .post(this.getOptions(), this.path.login, payload)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .post(this.getOptions(), this.path.logout)
        .then((response) =>  resolve(response))
        .catch((error) => reject(error));
    });
  }

  resetpassword({ email, token, password, id , roles}) {
    let { ACCOUNT_ID } = this.constants;
    return new Promise((resolve, reject) => {
      let payload = {
        account_id: ACCOUNT_ID,
        email,
        token,
        password,
        id,
        roles
      };
      this.bsCoreApiClient.clientApiProvider
        .post(this.getOptions(),this.path.resetpassword, payload)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default Auth;
