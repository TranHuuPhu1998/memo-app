import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    actOnCLickNode,
    actFetchAllDataMemoRequest,
    sortTask
} from "../../actions/index";
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from "react-intl";

import moment from 'moment';
import { getUrlParam, createUrl } from './url_handler.js';


class BodyNavCreateTitle extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allnote: false,
            sort: false,
            loading: false,
            posts: [],
            stateQ: 1,
            page: getUrlParam()["page"] ? parseInt(getUrlParam()["page"]) : 1
        };

    }

    componentDidMount() {
        let { paginate } = this.props;
        this.props.fetchAllDataMome();
        paginate(this.state.page)

    }

    onClickSort = sortby => {
        this.props.onSort({
            value: -+this.props.sort.value,
            sortby: sortby
        });
        this.setState({
            sort: !this.state.sort
        })
    };

    onpageshow = (number) => {
        this.setState({
            page: number
        })
        let { history, paginate } = this.props;
        history.history.push(createUrl({ page: number }))
        paginate(number);//value là this.state.page
    }

    renderPage = () => {
        let { pageNumbers, totalPage, showallnote } = this.props;
        const currentPage = this.state.page;
        return (
            <nav className={showallnote.statusHistory === "showHistory" ? "noneHistory" : ""
            }>
                <ul className='pagination'>
                    <li className={currentPage === 1 ? "page-item" : ""} >
                        <button disabled={currentPage === 1} onClick={() => this.onpageshow(currentPage - 1)} className='page-link'>
                            Prier
                            </button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() =>
                                this.onpageshow(number)
                            }
                                className={currentPage === number ? 'page-link activepage' : 'page-link'}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={totalPage === currentPage ? "page-item" : ""}>
                        <button disabled={totalPage === currentPage} onClick={() => this.onpageshow(currentPage + 1)} className='page-link'>
                            Next
                            </button>
                    </li>
                </ul>
            </nav >
        );
    }

    showTitleContent = () => {
        let rs = [];

        let { idClick, sort, showallnote, historyDelete, posts } = this.props;
        // if (posts) {
        //     posts = posts;
        // }
        // const { posts } = this.state;
        if (sort.sortby === "date") {
            posts.sort((a, b) => {
                a = new Date(a.categoryDate).getTime()
                b = new Date(b.categoryDate).getTime()
                if (a < b) {
                    return -sort.value;
                } else if (a > b) return sort.value;
                else return 0;
            });
        }
        if (showallnote.statusSearch && showallnote.statusSearch === "search") {
            posts = posts.filter(task => {
                return (
                    task.titleMemo
                        .toLowerCase()
                        .indexOf(showallnote.keyword.toLowerCase()) !== -1
                );
            });
        }
        if (showallnote.statusShowALl && showallnote.statusShowALl === "showall") {
            posts = this.props.posts;
        }
        if (showallnote.statusClip && showallnote.statusClip === "showClip") {
            posts = posts.filter(task => task.clip === true);
        }
        if (showallnote.statusCategory && showallnote.statusCategory === "showCategory") {
            posts = posts.filter(
                task => task.categoryName === showallnote.nameCategory
            );
        }
        if (showallnote.statusHistory && showallnote.statusHistory === "showHistory") {
            posts = historyDelete;
        }

        posts.map((item, index) =>
            rs.push(
                <Link
                    key={index}
                    to="/homepage/contentnote"
                    style={{ width: "100%", textDecoration: "none" }}
                >
                    <div className="body__nav__create--title--content ">
                        <div
                            onClick={() => {
                                this.props.onClickTitleNode(item._id);
                            }}
                            className={
                                idClick === item._id
                                    ? `body__nav__create--title--content--name active`
                                    : `body__nav__create--title--content--name`
                            }
                        >
                            <div className="body__nav__create--title--content--name--content">
                                <p>{item.titleMemo}</p>
                                <span>
                                    <img
                                        src="/images/clock-regular.svg"
                                        alt=""
                                    />
                                    &nbsp; {moment(item.categoryDate).format("YYYY-MM-DD")}
                                </span>
                                <span>
                                    <img src="/images/tag-solid.svg" alt="" />
                                    &nbsp; {item.categoryName}
                                </span>
                            </div>
                            <div
                                className={item.clip === false
                                    ? `body__nav__create--title--content--name--icon`
                                    : `body__nav__create--title--content--name--icon activeIcon`
                                }
                            >
                                {item.clip === false ? ("") : (
                                    <span>
                                        <img
                                            src="/images/paperclip-solid-c.svg"
                                            alt=""
                                        />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="body__nav__create--title--content--icon"></div>
                    </div>
                </Link>
            )
        );

        return rs;
    };

    handlePageChange = (newpage) => {
        this.props.setFiltersPage(newpage);
    }

    render() {

        return (
            <div className="body__nav__create--title">
                <div className="body__nav__create--title--name ">
                    <span>
                        <FormattedMessage id="Title" defaultMessage="Title">
                            {x => x}
                        </FormattedMessage>
                    </span>
                    <Tooltip title="Sort by Date">
                        <span onClick={() => this.onClickSort("date")}>
                            <img className={this.state.sort === true ? "sortactive" : "sort"}
                                src="/images/sort-amount-up-alt-solid.svg"
                                alt=""
                            ></img>
                        </span>
                    </Tooltip>

                </div>
                <div style={{
                    width: '100%',
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>
                        {this.showTitleContent()}
                    </div>
                    <div >
                        {this.renderPage()}
                    </div>

                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.fetchAllDataMemo,
        idClick: state.getActiveMemo,
        sort: state.sortTask,
        showallnote: state.showallnote,
        historyDelete: state.history,

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClickTitleNode: idClick => {
            dispatch(actOnCLickNode(idClick));
        },
        fetchAllDataMome: () => {
            dispatch(actFetchAllDataMemoRequest());
        },
        onSort: sort => {
            dispatch(sortTask(sort));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BodyNavCreateTitle);
