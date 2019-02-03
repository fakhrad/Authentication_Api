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

const changeCity = async ({ cityCode }) => {
    try {
        const url = authApis.BASE_URL + authApis.CHANGE_CITY;
        const { token, _id } = authManager.instance.currentUser;
        var rawResponse = await fetch(url, {
            method: "PUT",
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: _id,
                citycode: cityCode
            })
        });
        return rawResponse;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};

const getCities = async () => {
    try {
        const url = authApis.BASE_URL + authApis.GET_CITIES;
        var rawResponse = await fetch(url);
        return rawResponse;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};

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

alertError = error => {
    Alert.alert(error);
};
export { logIn, signUp, verifyCode, changeCity, getCities };
