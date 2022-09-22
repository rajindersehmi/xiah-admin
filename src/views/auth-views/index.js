import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${AUTH_PREFIX_PATH}/login/email`}
          component={lazy(() => import(`./authentication/email`))}
        />
        {/* <Route
          path={`${AUTH_PREFIX_PATH}/login`}
          component={lazy(() => import(`./authentication/send-otp`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/verify-otp`}
          component={lazy(() => import(`./authentication/verify-otp`))}
        /> */}
        <Redirect
          from={`${AUTH_PREFIX_PATH}`}
          to={`${AUTH_PREFIX_PATH}/login/email`}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
