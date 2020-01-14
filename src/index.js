import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./reduxs/store-config";
import { isAuthenticated } from "./services/auth";

// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Login/Login";
import "assets/css/material-dashboard-react.css";
const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

ReactDOM.render(
    <Provider store={Store}>
        <Router history={hist}>
            <Switch>
                <PrivateRoute path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
