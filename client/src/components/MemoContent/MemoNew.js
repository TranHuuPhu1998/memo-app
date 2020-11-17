import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import * as actions from "../../actions/index";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import compose from 'recompose/compose';
class MemoNew extends Component {



    constructor(props, context) {
        super(props, context);
        this.state = {
            editnote: false,
            newnote: false,
            categoryDate: "",
            categoryName: "",
            titleMemo: "",
            contentMemo: "",
            clip: false,
        };
    }

    handleChange = async function (event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        let today = moment(new Date());

        await this.setState({
            [name]: value
        });

        if (this.state.categoryDate === null) {
            this.state.categoryDate = today.format("YYYY/MM/DD");
        }


        this.props.SaveDatatoStore(this.state);
    };

    UNSAFE_componentWillMount = () => {
        var { match } = this.props;
        if (match.path === "/homepage/editnode") {
            this.setState({
                _id: this.props.dataEdit._id,
                categoryDate: this.props.dataEdit.categoryDate,
                categoryName: this.props.dataEdit.categoryName,
                contentMemo: this.props.dataEdit.contentMemo,
                titleMemo: this.props.dataEdit.titleMemo,
                clip: this.props.dataEdit.clip
            });
        }
        if (match.path === "/homepage/newnote") {
            this.setState({
                _id: undefined,
                categoryDate: null,
                categoryName: "",
                contentMemo: "",
                titleMemo: "",
                clip: false
            });
        }
        if (match.path && match.path === "/homepage/editnode") {
            this.setState({
                editnote: true
            });
        } else {
            this.setState({
                editnote: false
            });
        }
    };

    render() {
        let {
            // categoryDate,
            categoryName,
            titleMemo,
            contentMemo,
            editnote,
        } = this.state;
        /* SET CATEGODY */

        let { categoryget, classes } = this.props;
        let category = [];
        categoryget.map(x => category.push(x.category));
        let rs = new Set(category);
        rs = [...rs]
        /* GET DATE TODAY */
        let date = moment(new Date());
        date = date.format("YYYY-MM-DD");

        return (
            <div className="Memo-new">
                <h1>
                    {editnote === false ? (
                        <FormattedMessage
                            id="New_note"
                            defaultMessage="New_note"
                        >
                            {x => x}
                        </FormattedMessage>
                    ) : (
                            <FormattedMessage
                                id="Edit_note"
                                defaultMessage="Edit_note"
                            >
                                {x => x}
                            </FormattedMessage>
                        )}
                </h1>
                <form>
                    <div className="Memo-new__herder">
                        <div className="Memo-new__herder__data-category">
                            {editnote ? (
                                ""
                            ) : (
                                    <section>
                                        <b>
                                            {editnote === true ? (
                                                <FormattedMessage
                                                    id="Edit_date"
                                                    defaultMessage="Edit_date"
                                                >
                                                    {x => x}
                                                </FormattedMessage>
                                            ) : (
                                                    <FormattedMessage
                                                        id="New_date"
                                                        defaultMessage="New_date"
                                                    >
                                                        {x => x}
                                                    </FormattedMessage>
                                                )}
                                        </b>
                                        <span>
                                            <input
                                                type="date"
                                                name="categoryDate"
                                                onChange={e => this.handleChange(e)}
                                                // value={date || ""}
                                                defaultValue={date}
                                            ></input>
                                        </span>
                                    </section>
                                )}

                            <section>
                                <b>
                                    {editnote === true ? (
                                        <FormattedMessage
                                            id="Edit_category"
                                            defaultMessage="Edit_category"
                                        >
                                            {x => x}
                                        </FormattedMessage>
                                    ) : (
                                            <FormattedMessage
                                                id="New_category"
                                                defaultMessage="New_category"
                                            >
                                                {x => x}
                                            </FormattedMessage>
                                        )}

                                </b>
                                <span>
                                    <FormControl>
                                        <Select
                                            onChange={e => { this.handleChange(e) }}
                                            className={classes.selectBorder}
                                            name="categoryName"
                                            value={categoryName}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled hidden>Choose here</MenuItem>
                                            {rs.map((item, index) => (
                                                <MenuItem key={index} value={item} >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </span>
                            </section>
                        </div>
                    </div>
                    <div className="Memo-new__title">
                        <b>
                            {editnote === true ? (
                                <FormattedMessage
                                    id="Edit_title"
                                    defaultMessage="Edit_title"
                                >
                                    {x => x}
                                </FormattedMessage>
                            ) : (
                                    <FormattedMessage
                                        id="New_title"
                                        defaultMessage="New_title"
                                    >
                                        {x => x}
                                    </FormattedMessage>
                                )}
                        </b>
                        <h1>
                            <input
                                type="text"
                                name="titleMemo"
                                placeholder="fill in the title"
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                                value={titleMemo || ""}
                            ></input>
                        </h1>
                    </div>
                    <div className="Memo-new__content">
                        <b>
                            {editnote === true ? (
                                <FormattedMessage
                                    id="Edit_content"
                                    defaultMessage="Edit_content"
                                >
                                    {x => x}
                                </FormattedMessage>
                            ) : (
                                    <FormattedMessage
                                        id="Edit_content"
                                        defaultMessage="Edit_content"
                                    >
                                        {x => x}
                                    </FormattedMessage>
                                )}
                        </b>
                        <textarea
                            id="style"
                            type="text"
                            name="contentMemo"
                            onChange={e => {
                                this.handleChange(e);
                            }}
                            value={contentMemo || ""}
                        ></textarea>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataEdit: state.editNote,
        datatamp: state.dataSavetamp,
        categoryget: state.categoryget,
        idClick: state.idClick
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveMemo: dataAdd => {
            dispatch(actions.actAddNodeMemoRequest(dataAdd));
        },
        SaveDatatoStore: dataAdd => {
            dispatch(actions.actSaveDatatoStore(dataAdd));
        }
    };
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(MemoNew);

