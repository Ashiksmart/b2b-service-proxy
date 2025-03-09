import BsCoreApiClient from "../bsCoreApiClient"

class VersionControl {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = "/version";
  }

  find(type) {
    return new Promise((resolve, reject) => {
      const query = { type };
      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(), this.path, query)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default VersionControl;
