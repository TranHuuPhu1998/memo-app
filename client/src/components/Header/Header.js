import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import {
    actAddNodeMemoRequest,
    actEditNode,
    actDeleteNodeRequest,
    actUpdateNodeRequest,
    actUpdateClipNodeRequest,
    searchTask,
    acthistoryDeleteRequest
} from "./../../actions/index";
import { toast } from "react-toastify";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            statusclip: null,
            value: true,
            token: ''
        };
    }
    EditMemo = idClick => {
        let { datas } = this.props;
        var rs = null;
        datas.forEach(element => {
            if (element._id === idClick) {
                rs = element;
            }
        });
        this.props.onEditMemo(rs);
    };

    SaveMemo = data => {

        let { locale } = this.props;
        let mtil =
            locale === "vn"
                ? "Thêm ghi chú thành công"
                : locale === "jp"
                    ? "メモの追加に成功"
                    : locale === "en"
                        ? "Add Note Success"
                        : " ";
        let mtil2 =
            locale === "vn"
                ? "Lưu ghi chú thành công"
                : locale === "jp"
                    ? "メモの保存に成功"
                    : locale === "en"
                        ? "Save Note Success"
                        : " ";
        if (data._id) {
            data.categoryDate = moment(new Date()).format("YYYY/MM/DD");
            this.props.onUpdate(data);
            toast.success(mtil2);
        } else {
            this.props.onAddMemo(data);
            toast.success(`🐱${mtil}`);
        }
    };

    ClipMemo = idClick => {
        let { datas, locale } = this.props;
        var rs = null;
        let mtil =
            locale === "vn"
                ? "Cập nhật Clip Lưu ý thành công"
                : locale === "jp"
                    ? "クリップノートの更新の成功"
                    : locale === "en"
                        ? "Update Clip Note Success"
                        : " ";

        datas.forEach(element => {
            if (element._id === idClick) {
                rs = element;
            }
        });
        if (rs === null) {
            return;


        }
        rs.clip = !rs.clip;
        this.props.onCLipMemo(rs);
        toast.success(`🐶${mtil}`);
    };

    checkClipColor = idClick => {
        var rs = "";
        let { datas } = this.props;
        datas.forEach(element => {
            if (element._id === idClick && element.clip === true) {
                rs = "activeIcon";
            }
        });
        return rs;
    };

    componentDidMount() {
        let token = document.cookie && document.cookie.split(';').find(n => n.includes('authorization')) ? document.cookie.split(';').find(n => n.includes('authorization')).split('=')[1] : '';
        this.setState({
            token
        })
    }

    componentDidUpdate() {
        let { token } = this.state;
        if (token === '') {
            return <Redirect to='/' />
        }
    }

    Clear = () => {
        var rs = {
            id: undefined,
            categoryDate: "",
            categoryName: "",
            contentMemo: "",
            titleMemo: "",
            clip: false
        };
        return rs;
    };
    onChange = event => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    };
    onSearch = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.keyword);
    };

    onDelete = (idClick) => {
        let { datas, locale } = this.props;
        let mtil =
            locale === "vn"
                ? "Xóa ghi chú thành công"
                : locale === "jp"
                    ? "メモの削除の成功"
                    : locale === "en"
                        ? " Delete Note Success"
                        : " ";
        var rs = null;

        datas.forEach(element => {
            if (element._id === idClick) {
                rs = element;
            }
        });
        this.props.historyDelete(rs);

        if (idClick) {
            this.props.Delete(idClick);
            toast.info(`🦄 ${mtil} !`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    };

    render() {
        let { keyword } = this.state;
        let { color } = this.props.color;

        return (
            <div className="header">
                <div className="header__content">
                    <div className="header__content__create--new">
                        <Link to="/homepage/newnote" className="newNode">
                            <Tooltip title="Create New Note">
                                <button>
                                    <span>
                                        <img src="/images/plus-solid.svg" alt="" />
                                        &emsp;
                                        <FormattedMessage
                                            id="Create_new"
                                            defaultMessage="Create_new"
                                        >
                                            {x => x}
                                        </FormattedMessage>
                                    </span>
                                </button>
                            </Tooltip>
                        </Link>
                    </div>
                    <form onSubmit={this.onSearch}>
                        <div
                            className="header__content__title"
                            style={{ backgroundColor: color }}
                        >

                            <input
                                type="text"
                                placeholder="キーワードを入力"
                                name="keyword"
                                value={keyword}
                                onChange={this.onChange}
                            />

                            {/* onClick={this.onSearch} */}
                            <button type="submit">
                                <img
                                    className="search"
                                    src="/images/search-solid.svg"
                                    alt=""
                                ></img>
                            </button>

                        </div>
                    </form>
                </div>
                <div
                    className="header__action"
                    style={{ backgroundColor: color }}
                >
                    <div className="header__action--left">
                        <Link to="/homepage/editnode">

                            <button
                                onClick={() =>
                                    this.EditMemo(this.props.idClick)
                                }
                            >
                                <img src="/images/pen-solid.svg" alt="" />
                                &nbsp;&nbsp;
                                <FormattedMessage
                                    id="Edit"
                                    defaultMessage="Edit"
                                >
                                    {x => x}
                                </FormattedMessage>
                            </button>
                        </Link>
                        <button onClick={() => this.SaveMemo(this.props.data)}>
                            <img src="/images/save-solid.svg" alt="" />
                            &nbsp;&nbsp;
                            <FormattedMessage id="Save" defaultMessage="Save">
                                {x => x}
                            </FormattedMessage>
                        </button>
                        <button
                            onClick={() => this.ClipMemo(this.props.idClick)}
                            className={this.checkClipColor(this.props.idClick)}
                        >
                            {this.checkClipColor(this.props.idClick) ? (
                                <img
                                    src="/images/paperclip-solid-red.svg"
                                    alt=""
                                />
                            ) : (
                                <img src="/images/paperclip-solid.svg" alt="" />
                            )}
                            &nbsp;
                            <FormattedMessage id="Clip" defaultMessage="Clip">
                                {x => x}
                            </FormattedMessage>
                        </button>
                    </div>
                    <div className="header__action--right">
                        <button
                            onClick={() => this.onDelete(this.props.idClick)}
                        >
                            <img src="/images/delete.svg" alt="" />
                            &nbsp;&nbsp;
                            <FormattedMessage
                                id="Delete"
                                defaultMessage="Delete"
                            >
                                {x => x}
                            </FormattedMessage>
                        </button>
                    </div>
                    <div className="header__action--right">
                        <button
                            onClick={() => {
                                document.cookie = `authorization=${this.state.token}; max-age=0`;
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.dataSavetamp,
        datas: state.fetchAllDataMemo,
        idClick: state.getActiveMemo,
        dataEdit: state.dataSavetamp,
        color: state.color,
        locale: state.locale
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddMemo: dataAdd => {
            dispatch(actAddNodeMemoRequest(dataAdd));
        },
        onEditMemo: dataEdit => {
            dispatch(actEditNode(dataEdit));
        },
        Delete: id => {
            dispatch(actDeleteNodeRequest(id));
        },
        onUpdate: data => {
            dispatch(actUpdateNodeRequest(data));
        },
        onCLipMemo: dataClip => {
            dispatch(actUpdateClipNodeRequest(dataClip));
        },
        onSearch: keyword => {
            dispatch(searchTask(keyword));
        },
        historyDelete: data => {
            dispatch(acthistoryDeleteRequest(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
