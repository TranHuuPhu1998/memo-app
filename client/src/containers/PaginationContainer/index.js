import React, { useState } from 'react';
import BodyNavCreateTitle from '../../components/BodyNavCreateTitle/BodyNavCreateTitle';
import { useSelector } from "react-redux";
const PaginationContainer = (props) => {

    const post = useSelector(state => state.fetchAllDataMemo);

    return (
        <BodyNavCreateTitle
            posts={post}
            history={props.routerHistory}
        />
    );
};

export default PaginationContainer;
