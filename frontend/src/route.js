import React from "react";
import { Switch, Route } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import Cookies from "universal-cookie";
import LoginSignup from "./LoginSignup";
import Userlist from "./components/users/Userlist";
import Sidebar from "./components/layout/Sidebar";
import Navigation from "./components/layout/Navigation";
import profile from "./components/users/profile";
import User from "./components/users/User";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateProfile from "./components/users/UpdateProfile";

const BaseRoute = () => {
  const ProtectedRoute = (props) => {
    const { component: Component, ...prop } = props;
    const cookies = new Cookies();
    const token = cookies.get("access_token");

    return (
      <Route
        {...prop}
        render={(props) => (token ? <Component {...props} /> : <LoginSignup />)}
      />
    );
  };

  return (
    <>
      <CookiesProvider>
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <div className="w-full h-full bg-gray-200">
            <div className="flex flex-no-wrap">
              <Sidebar />
              <div className="w-full">
                <Navigation />
                <ProtectedRoute exact path="/users" component={Userlist} />
                <ProtectedRoute exact path="/users/view/:id" component={User} />

                <ProtectedRoute exact path="/profile" component={profile} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute
                  exact
                  path="/user/edit/:id"
                  component={UpdateProfile}
                />
              </div>
            </div>
          </div>
        </Switch>
      </CookiesProvider>
    </>
  );
};

export default withCookies(BaseRoute);
