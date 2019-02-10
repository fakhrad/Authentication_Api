import Config from "react-native-config";
const authApis = {
   BASE_URL: Config.BASE_URL || "http://13.69.148.176:8075",
  LOGIN_URL: Config.LOGIN_URL || "/shopper/api/v1/login",
  SIGNUP_URL: Config.SIGNUP_URL || "/shopper/api/v1/signup",
  VERIFY_CODE: Config.VERIFY_CODE || "/shopper/api/v1/verifycode",
  CHANGE_CITY: Config.CHANGE_CITY || "/shopper/api/v1/changecity",
  GET_CITIES: Config.GET_CITIES || "/cities/api/v1/getall",
  GET_USER_INFO: Config.GET_USER_INFO || "/shopper/api/v1/getshopperinfo",

  CHANGE_AVATAR: Config.CHANGE_AVATAR || "/shopper/api/v1/changeavatar",
  UPDATE_PROFULE: Config.UPDATE_PROFULE || "/shopper/api/v1/updateprofile",
  LOCATION_CHANGED:
    Config.LOCATION_CHANGED || "/shopper/api/v1/locationchanged",
  REQUEST_CODE: Config.REQUEST_CODE || "/shopper/api/v1/requestcode",
  CHANGE_NUMBER: Config.CHANGE_NUMBER || "/shopper/api/v1/changenumber",
  CHANGE_NOTIFICATION:
    Config.CHANGE_NOTIFICATION || "/shopper/api/v1/changenotification",
  DELETE_ACCOUNT: Config.DELETE_ACCOUNT || "/shopper/api/v1/deleteaccount"
};
export { authApis };
