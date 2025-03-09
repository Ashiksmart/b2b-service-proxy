"use strict";

import BaseEndpoint from "../apiClientBase/index"
const commandEndPoint = "/command";
const queryEndPoint = "/query";

class clientExecute extends BaseEndpoint.BaseEndpoint {
  command(options, payload) {
    return this.client(options).post(commandEndPoint, payload);
  }

  query(options, payload) {
    return this.client(options).post(queryEndPoint, payload);
  }
}

export default clientExecute;
