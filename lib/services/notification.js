import BsCoreApiClient from "../bsCoreApiClient"

class Notification {
    constructor(constants, interceptor, auth) {
        this.auth = auth;
        this.constants = constants;
        this.bsCoreApiClient = new BsCoreApiClient({
            baseURL: constants.BASE_URL,
            onError: interceptor.onError,
            onResponse: interceptor.onResponse,
            onRequest: interceptor.onRequest,
        });
        this.path = "/notification";
    }

    send(applicationName, modelName, data) {
        let { ACCOUNT_ID } = this.constants;
        return new Promise((resolve, reject) => {
            data.account_id=ACCOUNT_ID
            const payload = {
                application: applicationName,
                model: modelName
            };
            payload.payload = {...data}
           
            this.bsCoreApiClient.clientApiProvider
                .post(this.auth.getOptions(), this.path, payload)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }
}

export default Notification;