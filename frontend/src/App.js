import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./components/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { setIsAuth } from "./components/store/actions/auth";
import Cookies from "universal-cookie";
import BaseRoute from "./route";

const App = () => {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("access_token"));
  if (token) {
    store.dispatch(setIsAuth(true));
  }

  const active = store.getState().auth.isAuthenticated;
  useEffect(() => {
    setToken(cookies.get("access_token"));
  }, [active]);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <BaseRoute />
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
