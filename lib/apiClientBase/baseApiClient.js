import axios from "axios"
class BaseAPIClient {
  constructor(options = {}) {
    const client = axios.create(options)
    if (options.onResponse && options.onError) {
      client.interceptors.response.use(options.onResponse, options.onError)
    }
    if (options.onRequest) {
      client.interceptors.request.use(options.onRequest)
    }
    this.client = client;
  }
}

export default BaseAPIClient;
