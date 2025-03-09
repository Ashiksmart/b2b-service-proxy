import BsCoreApiClient from "../bsCoreApiClient"

class Otp {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.AUTH_BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = "/otp";
  }

  send(type, data) {
    let { ACCOUNT_ID , OTP_EMAIL , OTP_PHONE} = this.constants;
    return new Promise((resolve, reject) => {
      let payload = {
        account_id: ACCOUNT_ID,
        type:data.type
      }
      if(type == OTP_EMAIL){
        payload.email = data.email
      }else if(type == OTP_PHONE){
        payload.phone_number = data.phone_number
      }

      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path, payload)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  verify(type, data, otp){
    let { ACCOUNT_ID , OTP_EMAIL , OTP_PHONE} = this.constants;
    return new Promise((resolve, reject) => {
      let query = {
        account_id: ACCOUNT_ID,
        otp
      };

      if(type == OTP_EMAIL){
        query.email = data.email
      }else if(type == OTP_PHONE){
        query.phone_number = data.phone_number
      }

      this.bsCoreApiClient.clientApiProvider
        .get(this.auth.getOptions(),this.path, query)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default Otp;