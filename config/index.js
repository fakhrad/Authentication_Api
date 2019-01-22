import Config from "react-native-config";
const authApis = {
  BASE_URL: Config.authentiation.BASE_URL || "http://13.69.148.176:8075",
  LOGIN_URL: Config.authentiation.LOGIN_URL || "/shopper/api/v1/login",
  SIGNUP_URL: Config.authentiation.SIGNUP_URL || "/shopper/api/v1/signup",
  VERIFY_CODE: Config.authentiation.VERIFY_CODE || "/shopper/api/v1/verifycode",
  CHANGE_CITY: Config.authentiation.CHANGE_CITY || "/shopper/api/v1/changecity",
  GET_CITIES: Config.authentiation.GET_CITIES || "/cities/api/v1/getall",
  GET_SHOPER_INFO:
    Config.authentiation.GET_SHOPER_INFO || "/shopper/api/v1/getshopperinfo"
};
export { authApis };
