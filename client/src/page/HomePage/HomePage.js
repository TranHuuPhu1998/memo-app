import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BodyNavCreate from "../../components/BodyNavCreateNew/BodyNavCreate";
// import BodyNavCreateTitle from "../../components/BodyNavCreateTitle/BodyNavCreateTitle";
import PaginationContainer from "../../containers/PaginationContainer";

import routes from "../../routes/routesHomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PaintBrushSolid from "../../components/PaintBrushSolid/PaintBrushSolid";
import Language from "../../components/LanguagePage/Language";
import NewCategory from '../../components/NewCategory/NewCategory'
import TestLoader from "../../components/TestLoader/TestLoader"

import { Redirect } from 'react-router-dom';
import CallAPI from '../../utils/apiCaller';
export default (props) => {

    const [isRedirect, setIsRedirect] = useState('');

    var a = () => {
        CallAPI('api/checkToken', 'POST').then(doc => {
            setIsRedirect(!doc.data)
        })
    }

    useEffect(() => {
        document.removeEventListener('click', a)
        CallAPI('api/checkToken', 'POST').then(doc => {
            if (doc && doc.data) {
                document.addEventListener('click', a)
            } else {
                setIsRedirect(true)
            }
        })
        return () => {
            document.removeEventListener('click', a)
        }
        // eslint-disable-next-line
    }, [])

    if (isRedirect) {
        return <Redirect to='/' />
    }

    const showContentPage = routes => {
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

    return (
        <Router>
            <div className="wapper">
                <Header />
                <div className="body">
                    <BodyNavCreate />
                    {/* <BodyNavCreateTitle></BodyNavCreateTitle> */}
                    <TestLoader />
                    <PaginationContainer routerHistory={props} />
                    <PaintBrushSolid />
                    <Language />
                    <NewCategory />
                    {/* show routes */}
                    <Switch>
                        {showContentPage(routes)}
                    </Switch>

                </div>
            </div>
        </Router>
    )


}
