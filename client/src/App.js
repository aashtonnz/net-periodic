import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Root from "./views/Root";
import ErrorBoundary from "./views/ErrorBoundary";
import Routes from "./views/Routes";
import setAuthToken from "./utils/setAuthToken";
import { setUser } from "./actions/auth";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(setUser());
  }, []);

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <Router>
          <Root>
            <Routes />
          </Root>
        </Router>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
