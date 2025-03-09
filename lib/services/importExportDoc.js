import BsCoreApiClient from "../bsCoreApiClient"
import FormData from 'form-data';

class ImportExportDoc  {
  constructor(constants, interceptor,auth) {
    this.auth = auth;
    this.constants = constants;
    this.bsCoreApiClient = new BsCoreApiClient({
      baseURL: constants.BASE_URL,
      onError: interceptor.onError,
      onResponse: interceptor.onResponse,
      onRequest: interceptor.onRequest,
    });
    this.path = { importdoc : "/datafileupload",
                  exportdoc : "/exportdoc",
                  downloadoc: "/download"
                };
    this.headers = { 'Content-Type': 'multipart/form-data' }
  }

  upload(applicationName, modelName, file, header, duplicatebool = false, duplicaterules = []) {
    let { CREATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',CREATE_MODE)
      form.append('file',file)
      form.append('filetype',this.getFiletype(file.name))
      form.append('header',JSON.stringify(header))
      form.append('duplicate_check',duplicatebool)
      if(duplicaterules.length > 0 && duplicatebool){
        form.append('duplicate_check_rule',JSON.stringify(duplicaterules))
      }
      
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path.importdoc, form, undefined, this.headers)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  update(applicationName, modelName, file, condition = []) {
    let { UPDATE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',UPDATE_MODE)
      form.append('file',file)
      form.append('condition',JSON.stringify(condition))
      form.append('duplicate_check',false)
      form.append('duplicate_check_rule',JSON.stringify([]))
   
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path.importdoc, form, undefined, this.headers)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  delete(applicationName, modelName, file, condition = []) {
    let { DELETE_MODE } = this.constants;
    return new Promise((resolve, reject) => {
      var form = new FormData();
      form.append('application', applicationName);
      form.append('model', modelName);
      form.append('type',DELETE_MODE)
      form.append('file',file)
      form.append('duplicate_check',false)
      form.append('duplicate_check_rule',JSON.stringify([]))
      form.append('condition',JSON.stringify(condition))
      
      this.bsCoreApiClient.clientApiProvider
        .post(this.auth.getOptions(), this.path.importdoc, form, undefined, this.headers)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  export(application, model, filetype, condition = {}, field = []){
    const payload = {
      application,
      model,
      filetype,
      condition,
      field
    };
    return new Promise((resolve, reject) => {
      this.bsCoreApiClient.clientApiProvider
      .post(this.auth.getOptions(), this.path.exportdoc, payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
    });
  }

  downloadfile(query){
    // window.open('http://174.138.123.234:7004/download?application=b2b&template_id=48&type=csv', '_blank', 'noopener, noreferrer')
    window.open(`${this.constants.BASE_URL}${this.path.downloadoc}?${new URLSearchParams(query).toString()}`, '_blank', 'noopener, noreferrer')
  }

  getFiletype(filename){
    const extension = filename.split('.').pop().toLowerCase();
    return extension
  };

}

export default ImportExportDoc;