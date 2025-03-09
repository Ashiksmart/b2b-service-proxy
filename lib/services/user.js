import BsCoreApiClient from "../bsCoreApiClient"

class User {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = "/user";
  }

  create(role, data) {
    let { ACCOUNT_ID } = this.constants;
    return new Promise((resolve, reject) => {
      let payload = {
        account_id: ACCOUNT_ID,
        roles: role,
        ...data,
      };
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
        ...filter,
        direction: sort,
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
        .get(this.auth.getOptions(), this.path, query)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  update(params, payload) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .put(this.auth.getOptions(), this.path, payload, `/${params}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  delete(params) {
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
        .delete(this.auth.getOptions(), this.path, {},`/${params}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  
}

export default User;