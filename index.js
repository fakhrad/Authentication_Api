import { authManager, storageManager, navManager } from "@app-sdk/services";
import { Alert } from "react-native";
import { authApis } from "./config";

const logIn = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onCreatedCallBack;
  _onCreated = result => {
    if (_onCreatedCallBack) {
      _onCreatedCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  _call = async ({ phoneNumber }) => {
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

      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 201:
          _onCreated(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onCreated: function(callback) {
      _onCreatedCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    }
  };
};
const signUp = () => {
  let _onOkCallBack; // 200
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onCreatedCallBack; // 201
  _onCreated = result => {
    if (_onCreatedCallBack) {
      _onCreatedCallBack(result);
    }
  };

  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };

  _call = async ({ phoneNumber }) => {
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
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 201:
          _onCreated(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onCreated: function(callback) {
      _onCreatedCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    }
  };
};
const verifyCode = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };

  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async ({ phoneNumber, code }) => {
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
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          storageManager.setItem("userInfo", result);
          authManager.instance.currentUser = result;
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 404:
          _notFound(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    }
  };
};

const changeCity = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };

  _call = async cityCode => {
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
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          authManager.instance.currentUser = result;
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          _notFound(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};

const getCities = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  _call = async () => {
    try {
      const url = authApis.BASE_URL + authApis.GET_CITIES;
      var rawResponse = await fetch(url);
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 500:
          _onBadRequest(result);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    }
  };
};

const updateProfile = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async ({ first_name, last_name, address }) => {
    try {
      debugger;
      const url = authApis.BASE_URL + authApis.UPDATE_PROFULE;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          first_name: first_name,
          last_name: last_name,
          address: address
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          authManager.instance.currentUser = result;
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          _onBadRequest(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const changeNotification = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async notify => {
    try {
      const url = authApis.BASE_URL + authApis.CHANGE_NOTIFICATION;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          notification: notify
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          authManager.instance.currentUser = result;
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          notFound(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const changeAvatar = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async avatar => {
    try {
      var xhr = new XMLHttpRequest();
      const url = authApis.BASE_URL + authApis.CHANGE_AVATAR;
      const { token, _id } = authManager.instance.currentUser;

      xhr.open("PUT", url);
      xhr.onload = () => {
        const status = xhr.status;
        const result = JSON.parse(xhr._response);
        switch (status) {
          case 200:
            authManager.instance.currentUser = result;
            _onOk(result);
            break;
          case 400:
            _onBadRequest(result);
            break;
          case 401:
            _unAuthorized(result);
            break;
          case 404:
            _onBadRequest(result);
            break;
          case 500:
            _onServerError(result);
            break;
          default:
            break;
        }
      };
      var formdata = new FormData();
      formdata.append("avatar", {
        type: "image/jpeg",
        name: "ss.jpeg",
        uri: avatar.path
      });
      formdata.append("id", _id);

      if (xhr.upload) {
        xhr.upload.onprogress = event => {
          console.log("upload onprogress", event);
          if (event.lengthComputable) {
            console.log({
              uploadProgress: event.loaded / event.total
            });
          }
        };
      }
      xhr.setRequestHeader("authorization", "Bearer " + token);
      xhr.setRequestHeader("content-type", "multipart/form-data");
      await xhr.send(formdata);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const deleteAccount = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async () => {
    try {
      debugger;
      const url = authApis.BASE_URL + authApis.DELETE_ACCOUNT;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          _onBadRequest(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const requestCode = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  _call = async ({ phoneNumber }) => {
    try {
      const url = authApis.BASE_URL + authApis.REQUEST_CODE;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          phoneNumber: phoneNumber
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const changeNumber = () => {
  let _onOkCallBack;
  _onOk = result => {
    authManager.instance.currentUser = result;
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async ({ code }) => {
    try {
      const url = authApis.BASE_URL + authApis.CHANGE_NUMBER;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          code: parseInt(code)
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          _onBadRequest(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const changeLocation = () => {
  let _onOkCallBack;
  _onOk = result => {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async location => {
    try {
      const url = authApis.BASE_URL + authApis.LOCATION_CHANGED;
      const { token, _id } = authManager.instance.currentUser;
      var rawResponse = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          location: {
            lat: location.latitude,
            long: location.longitude
          }
        })
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          authManager.instance.currentUser = result;
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          notFound(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};
const getUserInfo = () => {
  let _onOkCallBack;
  _onOk = result => {
    authManager.instance.currentUser = result;
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  };
  let _onServerErrorCallBack;
  _onServerError = result => {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  };
  let _onBadRequestCallBack;
  _onBadRequest = result => {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  };
  let _unAuthorizedCallBack;
  _unAuthorized = result => {
    storageManager.removeItem("userInfo");
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  };
  let _notFoundCallBack;
  _notFound = result => {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  };
  _call = async userInfo => {
    try {
      const url =
        authApis.BASE_URL +
        authApis.GET_USER_INFO +
        "?phoneNumber=" +
        userInfo.phoneNumber;
      var rawResponse = await fetch(url, {
        method: "GET",
        headers: {
          authorization: "Bearer " + userInfo.token,
          "Content-Type": "application/json"
        }
      });
      const status = rawResponse.status;
      const result = await rawResponse.json();
      switch (status) {
        case 200:
          _onOk(result);
          break;
        case 400:
          _onBadRequest(result);
          break;
        case 401:
          _unAuthorized(result);
          break;
        case 404:
          notFound(result);
          break;
        case 500:
          _onServerError(result);
          break;
        default:
          break;
      }
    } catch (error) {
      alertError(error.message);
      return undefined;
    }
  };

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    }
  };
};

alertError = error => {
  Alert.alert(error);
};
export {
  logIn,
  signUp,
  verifyCode,
  changeCity,
  getCities,
  updateProfile,
  changeNotification,
  deleteAccount,
  changeAvatar,
  requestCode,
  changeNumber,
  changeLocation,
  getUserInfo
};
