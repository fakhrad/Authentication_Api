// this hoc getS a phone number to send it to server and then returns a code

import React from "react";
import { authApis } from "./../../config";
const withGetCities = ComposedComponent => {
  return class extends React.Component {
    state = { request: { connecting: false, success: false, error: false }, result: {} };
    getCities = async () => () => {
      this.setState({ request: { ...request, connecting: true } });
      try {
        const url = authApis.BASE_URL + authApis.GET_CITIES;
        var rawResponse = await fetch(url);
        const status = rawResponse.status;
        if (status == 200) {
          // exisiting user . created
          rawResponse.json().then(resp => {
            this.setState({
              request: {
                ...request,
                connecting: false,
                success: true,
                error: false
              },
              result: resp
            });
          });
        } else if (status == 500) {
          this.setState({
            request: { ...request, connecting: false, error: true }
          });
          // internal server error
          // const error = translate.t("LOGIN_ERROR_500");
          // alertError(error);
          // return undefined;
        } else if (status == 400) {
          this.setState({
            request: { ...request, connecting: false, error: true }
          });
          //  phone number is required
          // const error = translate.t("LOGIN_ERROR_400");
          // alertError(error);
          // return undefined;
        }
      } catch (error) {
        this.setState({
          request: { ...request, connecting: false, error: true }
        });
        // alertError(error.message);
        // return undefined;
      }
    };
    render() {
      return <ComposedComponent {...this.props} {...this.state} getCities={this.getCities} />;
    }
  };
};

export default withGetCities;