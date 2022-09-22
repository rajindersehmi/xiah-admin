import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/dashboards`}
          component={lazy(() => import(`./dashboards`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/blogs`}
          component={lazy(() => import(`./blogs`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/transactions`}
          component={lazy(() => import(`./transactions`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/brands`}
          component={lazy(() => import(`./brands`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/category`}
          component={lazy(() => import(`./category`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/business-segment`}
          component={lazy(() => import(`./business-segment`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/faqs`}
          component={lazy(() => import(`./faqs`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/infographics`}
          component={lazy(() => import(`./infographics`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/pages`}
          component={lazy(() => import(`./pages`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/landing-pages`}
          component={lazy(() => import(`./landing-pages`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/plans`}
          component={lazy(() => import(`./plans`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/permissions`}
          component={lazy(() => import(`./permissions`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/push-notifications`}
          component={lazy(() => import(`./push-notifications`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/users`}
          component={lazy(() => import(`./users`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/tickets`}
          component={lazy(() => import(`./tickets`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/awards`}
          component={lazy(() => import(`./awards`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/cities`}
          component={lazy(() => import(`./cities`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/business-listing`}
          component={lazy(() => import(`./business-listing`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/enquiries`}
          component={lazy(() => import(`./enquiries`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/purchased-enquiries`}
          component={lazy(() => import(`./purchased-enquiry`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/incomplete-enquiries`}
          component={lazy(() => import(`./incomplete-enquiry`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/contact-forms`}
          component={lazy(() => import(`./contact-forms`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/feedback-forms`}
          component={lazy(() => import(`./feedback-forms`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/auctions`}
          component={lazy(() => import(`./auction`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/extra-service`}
          component={lazy(() => import(`./extra-service`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/extra-service-content`}
          component={lazy(() => import(`./extra-service-content`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/partner-plans`}
          component={lazy(() => import(`./partner-plans`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/configuration`}
          component={lazy(() => import(`./platform-properties`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/redirection`}
          component={lazy(() => import(`./redirections`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/form`}
          component={lazy(() => import(`./forms`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/partners`}
          component={lazy(() => import(`./partners`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/tags`}
          component={lazy(() => import(`./tags`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/banners`}
          component={lazy(() => import(`./banners`))}
        />
        <Redirect
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/dashboards`}
        />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
