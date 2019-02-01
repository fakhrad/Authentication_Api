import { authManager } from "@app-sdk/services";
import { Alert } from "react-native";
import { authApis } from "./config";

const logIn = async ({ phoneNumber }) => {
    try {
        const url = authApis.BASE_URL + authApis.LOGIN_URL;
        var rawResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        });
        return rawResponse;
    } catch (error) {
        alertError(error.message);
        return undefined;
    }
};
const signUp = async ({ phoneNumber }) => {
    try {
        const url = authApis.BASE_URL + authApis.SIGNUP_URL;
        var rawResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        });
        return rawResponse;
    } catch (error) {
        alertError(error.message);
        return undefined;
    }
};
const verifyCode = async ({ phoneNumber, code }) => {
    try {
        const url = authApis.BASE_URL + authApis.VERIFY_CODE;
        var rawResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                code: code
            })
        });
        if (rawResponse.status == 200) {
            authManager.instance.currentUser = JSON.parse(rawResponse._bodyText);
        }
        return rawResponse;
    } catch (error) {
        console.log(error.message);
    }
};
// const getCities = async () => {
//   var cities = await appStorage.getItem("cities");
//   if (cities != undefined && cities != null && cities.length > 0) {
//     return JSON.parse(cities);
//   }
//   try {
//     const url = authApis.BASE_URL + authApis.GET_CITIES;
//     var rawResponse = await fetch(url);
//     const status = rawResponse.status;
//     if (status == 200) {
//       var cities = await rawResponse.json();
//       appStorage.setItem("cities", JSON.stringify(cities));
//       return cities;
//     } else if (status == 500) {
//       // internal server error
//       const error = translate.t("GET_CITIES_ERROR_500");
//       alertError(error);
//       return undefined;
//     }
//   } catch (error) {
//     console.log(error.message);
//     return undefined;
//   }
// };

// const getShopperInfo = async (token, phoneNumber) => {
//   try {
//     const url =
//       authApis.BASE_URL +
//       authApis.GET_SHOPER_INFO +
//       "?phoneNumber=" +
//       phoneNumber;
//     var rawResponse = await fetch(url, {
//       method: "GET",
//       headers: {
//         authorization: "Bearer " + token,
//         "Content-Type": "application/json"
//       }
//     });
//     const status = rawResponse.status;
//     if (status == 200) {
//       rawResponse.json().then(userInfo => {
//         store.dispatch({ type: types.SAVE_USER_INFO, value: userInfo });
//       });
//     } else if (status == 500) {
//       const error = translate.t("GET_SHOPPER_INFO_ERROR_500");
//       alertError(error);
//     } else if (status == 400) {
//       // invalid phone number
//       removeUserInfo();
//       initializing();
//     } else if (status == 401) {
//       // UnAuthorized;
//       removeUserInfo();
//       initializing();
//     } else if (status == 404) {
//       // not found
//       removeUserInfo();
//       initializing();
//     }
//   } catch (error) {
//     alertError(error.message);
//   }
// };

// const changeCity = async cityCode => {
//   try {
//     const url = authApis.BASE_URL + authApis.CHANGE_CITY;
//     const userInfo = store.getState().userReducer.userInfo;
//     const token = userInfo.token;
//     var rawResponse = await fetch(url, {
//       method: "PUT",
//       headers: {
//         authorization: "Bearer " + token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         id: userInfo._id,
//         citycode: cityCode
//       })
//     });
//     const status = rawResponse.status;
//     if (status == 200) {
//       return rawResponse;
//     } else if (status == 500) {
//       // server error
//       const error = translate.t("CHANGE_CITY_ERROR_500");
//       alertError(error);
//       return undefined;
//     } else if (status == 400) {
//       // invalid city code
//       const error = translate.t("CHANGE_CITY_ERROR_400");
//       alertError(error);
//       return undefined;
//     } else if (status == 404) {
//       // can not found city
//       const error = translate.t("CHANGE_CITY_ERROR_404");
//       alertError(error);
//       return undefined;
//     }
//   } catch (error) {
//     console.log(error.message);
//     return undefined;
//   }
// };

alertError = error => {
    Alert.alert(error);
};
export { logIn, signUp, verifyCode };
