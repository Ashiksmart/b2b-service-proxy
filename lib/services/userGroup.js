import BsCoreApiClient from "../bsCoreApiClient"

class UserGroup {
    constructor(constants, interceptor,auth) {
        this.auth = auth;
        this.constants = constants;
        this.bsCoreApiClient = new BsCoreApiClient({
          baseURL: constants.AUTH_BASE_URL,
          onError: interceptor.onError,
          onResponse: interceptor.onResponse,
          onRequest: interceptor.onRequest,
        });
        this.path ={
          usergroup:'/usergroup',
          permission:'/permission'
        }
      }


      create(payload){
        return new Promise((resolve, reject) => {
          this.bsCoreApiClient.clientApiProvider
            .post(this.auth.getOptions(), this.path.usergroup,payload)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      }

      find(page, limit, sort = "desc", filter){
        return new Promise((resolve, reject) => {
          let query = {
            page,
            limit,
            ...filter,
            direction: sort,
          };
          this.bsCoreApiClient.clientApiProvider
            .get(this.auth.getOptions(),this.path.usergroup,query)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      }
      
      findByid(id){
        return new Promise((resolve, reject) => {
          let query = {
            id
          };
          this.bsCoreApiClient.clientApiProvider
            .get(this.auth.getOptions(),this.path.usergroup, query)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      }
      update(params, payload){
        return new Promise((resolve, reject) => {
          this.bsCoreApiClient.clientApiProvider
            .put(this.auth.getOptions(),this.path.usergroup, payload, `/${params}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      }

      delete(params){
        return new Promise((resolve, reject) => {
          this.bsCoreApiClient.clientApiProvider
            .delete(this.auth.getOptions(),this.path.usergroup, {},`/${params}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      }

      permissions(){
        return new Promise((resolve, reject) => {
            this.bsCoreApiClient.clientApiProvider
              .get(this.auth.getOptions(),this.path.permission)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          });
      }

}

export default UserGroup;