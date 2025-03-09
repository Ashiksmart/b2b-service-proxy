"use strict";

import BaseEndpoint from "../apiClientBase/index";

class ClientApiProvider extends BaseEndpoint.BaseEndpoint {
  get(options, path, query = {}, params = "") {
    return this.client(options).get(`${path}${params}`, { params: query });
  }

  post(options, path, payload = {}, params = "", headers) {
    return this.client(options).post(`${path}${params}`, payload, {headers});
  }

  put(options, path, payload, params = "") {
    return this.client(options).put(`${path}${params}`, payload);
  }
  
  delete(options, path, payload, params = "") {
    return this.client(options).delete(`${path}${params}`, {data: payload});
  }
}

export default ClientApiProvider;
