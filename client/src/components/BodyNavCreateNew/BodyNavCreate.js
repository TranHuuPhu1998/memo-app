import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import {
    actShowAllNote,
    actShowAllClip,
    actShowCategory,
    actShowHistoryMemo,
    actGethistoryDeleteRequest,
    // actNewCategoryRequest,
    actGetCategoryRequest,
    actNewCategoryUI
} from "../../actions/index";

import Tooltip from "@material-ui/core/Tooltip";
import NewCategory from "../NewCategory/NewCategory";

export default (props) => {
    const dispatch = useDispatch();

    const [statusAll, setStatusAll] = useState(false);
    const [status, setStatus] = useState(false);
    const [statusClip, setstatusClip] = useState(false);
    const [open,] = useState(false);

    let datas = useSelector(state => state.fetchAllDataMemo);
    // let locale = useSelector(state => state.locale)
    // let categorynew = useSelector(state => state.categorynew);
    let categoryget = useSelector(state => state.categoryget);

    const showHistory = () => {
        dispatch(actGethistoryDeleteRequest());
        dispatch(actShowHistoryMemo());
    };
    const showCategoryClick = (item) => {
        dispatch(actShowCategory(item))
    }
    useEffect(() => {
        async function fetchData() {
            // You can await here
            await dispatch(actGetCategoryRequest());
        }
        fetchData();
    }, [dispatch]);

    const onOpenAndClose = status => {
        setStatus(!status);
        setstatusClip(false);
        setStatusAll(false);
    };
    const onOpenAndCloseClip = statusClip => {
        setStatus(false);
        setstatusClip(!statusClip);
        setStatusAll(false);
    };
    const onOpenAndCloseAll = statusAll => {
        setStatus(false);
        setstatusClip(false);
        setStatusAll(!statusAll);
    };
    const onShowAllNote = () => {
        dispatch(actShowAllNote());
        onOpenAndCloseAll(statusAll);
    };
    const onShowAllClip = () => {
        dispatch(actShowAllClip());
        onOpenAndCloseClip(statusClip);
    };
    const handleClickOpen = () => {
        dispatch(actNewCategoryUI(true))
    }
    const setCategory = () => {
        let rs = [];
        categoryget.forEach(element => {
            rs.push(element.category);
        });
        let set = new Set(rs);
        return [...set];
    };
    const countCategory = item => {
        let count = 0;
        datas.forEach(element => {
            if (element.categoryName === item) {
                count++;
            }
        });
        return count;
    };

    const countClip = () => {
        let count = 0;
        datas.forEach(element => {
            if (element.clip === true) {
                count++;
            }
        });
        return count;
    };

    const showCategory = () => {
        let rs = [];
        let categoryName = setCategory();
        categoryName.forEach((item, index) =>
            rs.push(
                <div
                    key={index}
                    className="body__nav__create--new--Category__title--down--content"
                >
                    <span>
                        <img src="/images/tag-solid1.svg" alt=""></img>
                    </span>
                    <span onClick={() => showCategoryClick(item)}>
                        {item}
                    </span>

                    <span>{countCategory(item)}</span>
                </div>
            )
        );
        return rs;
    };
    const componentNewCategory = <NewCategory open={open}></NewCategory>
    return (
        <>
            {componentNewCategory}
            <div className="body__nav__create--new">
                <section>
                    <Tooltip title="Show All Note">
                        <div
                            onClick={onShowAllNote}
                            className={
                                statusAll === true
                                    ? "body__nav__create--new--Allnodes activeCategory"
                                    : "body__nav__create--new--Allnodes"
                            }
                        >
                            <span>
                                <img
                                    src="/images/sticky-note-solid.svg"
                                    alt=""
                                ></img>
                            </span>
                            <span>
                                <FormattedMessage
                                    id="All_notes"
                                    defaultMessage="All_notes"
                                >
                                    {x => x}
                                </FormattedMessage>
                                &nbsp; &nbsp;
                            </span>
                            <span>{datas.length}</span>
                        </div>
                    </Tooltip>
                    <div className="body__nav__create--new--Category">
                        <Tooltip title="See Categorys">
                            <div
                                onClick={() => onOpenAndClose(status)}
                                className={
                                    status === true
                                        ? "body__nav__create--new--Category__title activeCategory"
                                        : "body__nav__create--new--Category__title"
                                }
                            >
                                <span>
                                    <img src="/images/tags-solid.svg" alt="" />
                                </span>
                                <span>
                                    <FormattedMessage
                                        id="Category"
                                        defaultMessage="Category"
                                    >
                                        {x => x}
                                    </FormattedMessage>
                                </span>
                                <span
                                    className={
                                        status === true
                                            ? "down activedown"
                                            : "down"
                                    }
                                ></span>
                            </div>
                        </Tooltip>
                        <div
                            id="style"
                            className={
                                status === true
                                    ? "body__nav__create--new--Category__title--down activeHeight"
                                    : "body__nav__create--new--Category__title--down"
                            }
                        >
                            <div
                                className="body__nav__create--new--Category__title--down--content"
                                onClick={handleClickOpen}
                            >
                                <span>
                                    <img src="/images/plus-solid-while.svg" alt="" />
                                </span>
                                <span>New Category</span>
                                <span>New</span>
                            </div>

                            {showCategory()}
                        </div>
                    </div>
                    <Tooltip title="Show All Note">
                        <div
                            onClick={() => onShowAllClip(true)}
                            className={
                                statusClip === true
                                    ? "body__nav__create--newclip activeCategory"
                                    : "body__nav__create--newclip"
                            }
                        >
                            <span>
                                <img
                                    src="/images/paperclip-solid-while.svg"
                                    alt=""
                                ></img>
                            </span>
                            <span>
                                <FormattedMessage
                                    id="Clip"
                                    defaultMessage="Clip"
                                >
                                    {x => x}
                                </FormattedMessage>
                            </span>
                            <span>{countClip()}</span>
                        </div>
                    </Tooltip>
                </section>
                <div className="body__nav__create--delete">
                    <Tooltip title="Show History Delete">
                        <button
                            onClick={showHistory}
                            className="fas fa-trash-alt"
                        >
                            <img src="/images/delete_create.svg" alt="" />
                            &emsp;&nbsp;
                            <FormattedMessage
                                id="History_delete"
                                defaultMessage="History_delete"
                            >
                                {x => x}
                            </FormattedMessage>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
};
