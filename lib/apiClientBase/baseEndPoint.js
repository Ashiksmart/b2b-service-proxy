"use strict";

class BaseEndpoint {
  constructor(client) {
    this._client = client
  }

  client(options) {
    this._client.defaults.headers = { common : {} }

    let { authToken } = options

    if (authToken) {
      this._client.defaults.headers.common.Authorization = 'Bearer ' + authToken
    }

    return this._client
  }
}

export default BaseEndpoint;
