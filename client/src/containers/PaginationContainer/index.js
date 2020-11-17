import React, { useState } from 'react';
import BodyNavCreateTitle from '../../components/BodyNavCreateTitle/BodyNavCreateTitle';
import { useSelector } from "react-redux";
const PaginationContainer = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);


    const post = useSelector(state => state.fetchAllDataMemo);

    const totalPage = Math.ceil(post.length / postsPerPage);
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)

    };

    const pageNumbers = [];
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <BodyNavCreateTitle
            totalPage={totalPage}
            pageNumbers={pageNumbers}
            paginate={paginate}
            posts={currentPosts}
            currentPage={currentPage}
            history={props.routerHistory}
        />
    );
};

export default PaginationContainer;
