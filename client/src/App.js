import React, { Component } from "react";
import routes from "./routes/routesAllPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {

    render() {
        return (
            <Router>
                <React.Fragment>
                    {this.showContentPage(routes)}
                </React.Fragment>
            </Router>
        );
    }
    showContentPage = routes => {
        var rs = null;
        if (routes.length > 0) {
            rs = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return <Switch>{rs}</Switch>;
    };
}

export default App;
