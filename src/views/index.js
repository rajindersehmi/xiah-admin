import React, { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import { messaging } from "configs/FirebaseConfig";
import JwtAuthService from "services/JwtAuthService";

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  const { locale, token, location, direction, user } = props;

  useEffect(() => {
    if (!token) return;
    if (!user) return;

    messaging
      .getToken({
        vapidKey:
          "BKOLmwlO0UbLMS-t3Tl3026DI7qC5Mc3klWNyK6-K3X-rvbDSdDTMASwywTCmzjBU6MM4M0tMBi5tnGdl5kEt3s",
      })
      .then((deviceToken) => {
        // saving device token if now already have
        if (deviceToken) {
          const alreadyHaveToken = user?.fcm_tokens
            .map((f) => f.device_token)
            .includes(deviceToken);
          if (!alreadyHaveToken) {
            saveFCMToken(deviceToken);
          }
        }
      })
      .catch((error) => {});
  }, [token, user]);

  const saveFCMToken = async (token) => {
    const formdata = new FormData();
    formdata.append("device_token", token);
    await JwtAuthService.saveToken(formdata);
  };

  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token, user } = auth;
  return { locale, direction, token, user };
};

export default withRouter(connect(mapStateToProps)(Views));
