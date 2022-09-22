import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import Privacy from "views/auth-views/Privacy";
import TermCondition from "views/auth-views/TermCondition";
const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={THEME_CONFIG.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <Router>
            <Switch>
              <Route path="/" component={Views} />
            </Switch>
            <Route path="/terms-of-use" component={TermCondition} />
            <Route path="/privacy-policy" component={Privacy} />
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
