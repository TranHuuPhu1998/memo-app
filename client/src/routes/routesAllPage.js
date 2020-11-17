import React from "react";
import Login from "../page/LoginPage/LoginPage";
import HomePage from "../page/HomePage/HomePage";
import Registration from "../page/RegistrationPage/RegistrationPage";

export const routes = [
    {
        path: "/",
        exact: true,
        main: () => (
            <Login />
        )
    },
    {
        path: "/homepage",
        exact: false,
        main: ({ match, history }) => (
            <HomePage match={match} history={history} />
        )
    },
    {
        path: "/register",
        exact: false,
        main: () => (
            <Registration />
        )
    },

];

export default routes;