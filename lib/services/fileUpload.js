import BsCoreApiClient from "../bsCoreApiClient"
import FormData from 'form-data';

class FileUpload  {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = "/upload";
    this.headers = { 'Content-Type': 'multipart/form-data' }
  }

  upload(applicationName, modelName, file) {
    let { CREATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',CREATE_MODE)
      file.forEach((file_, index) => {
        form.append(`file`, file_);
      });
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path, form,"",this.headers)
        .then(async (response) => {
          resolve(response)
        })
        .catch((error) => reject(error));
    });
  }

  update(applicationName, modelName, file, path) {
    let { UPDATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',UPDATE_MODE)
      file.forEach((file_, index) => {
        form.append(`file`, file_);
      });
      path.forEach((path_, index) => {
        form.append('file_path',path_)
      });
      ids.forEach((ids_, index) => {
        form.append('ids',ids_)
      });
      
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path, form, "",this.headers)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  delete(applicationName, modelName, path, ids) {
    let { DELETE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',DELETE_MODE)
      path.forEach((path_, index) => {
        form.append('file_path',path_)
      });
      ids.forEach((ids_, index) => {
        form.append('ids',ids_)
      });
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path, form,"",this.headers)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

export default FileUpload;