import React from "react";
import MemoNew from "../components/MemoContent/MemoNew";
import MemoContent from "../components/MemoContent/MemoContent";
import Welcome from "../components/Welcome/welcome";

export const routes = [

    {
        path: "/homepage",
        exact: true,
        main: () => (
            <Welcome />
        )
    },
    {
        path: "/homepage/contentnote",
        exact: false,
        main: () => (
            <MemoContent />
        )
    },
    {
        path: "/homepage/newnote",
        exact: false,
        main: ({ match, history }) => (
            <MemoNew match={match} history={history} />
        )
    },
    {
        path: "/homepage/editnode",
        exact: false,
        main: ({ match, history }) => (
            <MemoNew match={match} history={history} />
        )
    },

];

export default routes;