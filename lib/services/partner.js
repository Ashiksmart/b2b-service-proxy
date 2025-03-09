import BsCoreApiClient from "../bsCoreApiClient"

class Partner {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = "/partner";
  }

  create(payload) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path, payload)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  find(page, limit, sort = "desc", filter) {
    return new Promise((resolve, reject) => {
      let query = {
        page,
        limit,
        direction: sort,
        ...filter,
      };
      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(), this.path, query)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  findByid(id) {
    return new Promise((resolve, reject) => {
      let query = {
        id
      };
      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(),this.path, query)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  update(id, payload) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .put(this.auth.getOptions(),this.path, payload,`/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .delete(this.auth.getOptions(),this.path, {},`/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default Partner;
