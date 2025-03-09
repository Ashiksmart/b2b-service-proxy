import BaseAPIClient from "../apiClientBase"
import ClientExecute from "./clientExecute"
import ClientApiProvider from "./clientApiProvider"

class APIClient extends BaseAPIClient.BaseAPIClient {
  constructor(options) {
    super(options);
    this.clientExecute = new ClientExecute(this.client);
    this.clientApiProvider = new ClientApiProvider(this.client);
  }
}

export default APIClient;