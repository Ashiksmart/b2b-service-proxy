import BsCoreApiClient from "../bsCoreApiClient";

class Account {
  constructor(constants, interceptor, auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = {
      account: "/account",
      domain: "/account/domain/",
    };
  }

  find() {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(), this.path.account)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  domain(url) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(), this.path.domain,{}, url)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default Account;
