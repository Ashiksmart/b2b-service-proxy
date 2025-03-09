import BsCoreApiClient from "../bsCoreApiClient"
class Business {
  constructor(constants, interceptor, auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
  }

  create(applicationName, modelName, data) {
    let { CREATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      const payload = {
        application: applicationName,
        model: modelName,
        type: CREATE_MODE,
      };
      payload.payload = {}
      payload.payload.items = [data];

      this.bsCoreApiClient.clientExecute
        .command(this.auth.getOptions(), payload)
        .then((response) => {
          if(response?.data){
            resolve(response.data);
          }else{
            resolve(response);
          }
        })
        .catch((error) => reject(error));
    });
  }

  update(applicationName, modelName, data, criteria) {
    let { UPDATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      const payload = {
        application: applicationName,
        model: modelName,
        type: UPDATE_MODE,
      };

      payload.payload = {}
      if (criteria === undefined) {
        payload.criteria = {id:data.id}

      }else{
        payload.criteria = criteria
      }
      payload.payload.items = [data];

      this.bsCoreApiClient.clientExecute
        .command(this.auth.getOptions(), payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  bulkCreate(applicationName, modelName, bulkData) {
    let { CREATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      const payload = {
        application: applicationName,
        model: modelName,
        type: CREATE_MODE,
      };

      payload.payload = {}
      payload.payload.items = bulkData;

      this.bsCoreApiClient.clientExecute
        .command(this.auth.getOptions(), payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  // bulkUpdate(applicationName, modelName, bulkData ) {
  //   let { UPDATE_MODE } = this.constants;
  //   return new Promise((resolve, reject) => {
  //     const payload = {
  //       application: applicationName,
  //       model: modelName,
  //       type: UPDATE_MODE,
  //     };

  //     payload.payload = {}
  //     payload.payload.items = bulkData;

  //     this.bsCoreApiClient.clientExecute
  //       .command(this.auth.getOptions(), payload)
  //       .then((response) => {
  //         resolve(response.data);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // }

  delete(applicationName, modelName, id) {
    let { DELETE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      const payload = {
        application: applicationName,
        model: modelName,
        type: DELETE_MODE,
        criteria: { id: [id] }
      };

      this.bsCoreApiClient.clientExecute
        .command(this.auth.getOptions(), payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  bulkDelete(applicationName, modelName, bulkId) {
    let { DELETE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      const payload = {
        application: applicationName,
        model: modelName,
        type: DELETE_MODE,
        criteria: { id: bulkId }
      };

      this.bsCoreApiClient.clientExecute
        .command(this.auth.getOptions(), payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  find(application, model, type, filters, fields, page, limit, sort, associated) {
    return new Promise((resolve, reject) => {
      const payload = {
        application,
        model,
        type,
        filters,
        fields,
        page,
        limit,
        sort
      }
      if (associated != undefined) {
        payload.associated = associated
      }
      this.bsCoreApiClient.clientExecute
        .query(this.auth.getOptions(), payload, this.queryEndPoint)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  findById(application, model, type, id, fields, page, limit, sort = "asc") {
    id = id ?? ""
    return new Promise((resolve, reject) => {
      const payload = {
        application,
        model,
        type,
        filters: {
          id: {
            $eq: id
          }
        },
        fields,
        page,
        limit,
        sort: [{
          column: "id",
          order: sort
        }]
      }
      this.bsCoreApiClient.clientExecute
        .query(this.auth.getOptions(), payload, this.queryEndPoint)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }
}

export default Business;