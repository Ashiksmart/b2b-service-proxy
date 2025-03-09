import Auth from "./lib/services/auth"
import Account  from "./lib/services/account"
import Business from "./lib/services/business"
import FileUpload from "./lib/services/fileUpload"
import LocalStorage from "./lib/services/localStorage"
import Notification  from "./lib/services/notification"
import Otp from "./lib/services/otp"
import Partner  from "./lib/services/partner"
import User  from "./lib/services/user"
import UserGroup  from "./lib/services/userGroup"
import VersionControl  from "./lib/services/versionControl"
import ImportExportDoc from "./lib/services/importExportDoc"
class ServiceProxy {
  constructor(constants, interceptor) {
    this.auth = new Auth(constants, interceptor);
    this.account = new Account(constants, interceptor, this.auth);
    this.business = new Business(constants, interceptor, this.auth);
    this.fileUpload = new FileUpload(constants, interceptor, this.auth);
    this.localStorage = LocalStorage;
    this.notification = new Notification(constants, interceptor, this.auth);
    this.otp = new Otp(constants, interceptor, this.auth);
    this.partner = new Partner(constants, interceptor, this.auth);
    this.user = new User(constants, interceptor, this.auth);
    this.userGroup = new UserGroup(constants, interceptor, this.auth);
    this.versionControl = new VersionControl(constants, interceptor, this.auth);
    this.importExportDoc = new ImportExportDoc(constants, interceptor, this.auth);
  }
}

export default ServiceProxy;
