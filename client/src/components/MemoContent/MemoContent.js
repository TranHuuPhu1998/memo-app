import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from 'moment'
class MemoContent extends Component {
    show = () => {
        var { data, showallnote, history } = this.props;
        var idClick = this.props.idClick;
        var rs = [];
        if (
            showallnote.statusHistory &&
            showallnote.statusHistory === "showHistory"
        ) {
            data = history;
        }
        data.forEach(element => {
            if (element._id === idClick) {
                rs.push(
                    <div key={element._id} className="body__action">
                        <h1 className="body__action-title">
                            <FormattedMessage
                                id="Notes_content"
                                defaultMessage="Notes_content"
                            >
                                {x => x}
                            </FormattedMessage>
                        </h1>
                        <div className="body__action--header">
                            <div className="body__action--header--date--category">
                                <span>
                                    <img
                                        src="/images/clock-regular-black.svg"
                                        alt=""
                                    ></img>
                                    &nbsp; {moment(element.categoryDate).format('YYYY-MM-DD')}
                                </span>
                                <span>
                                    <img
                                        src="/images/tag-solid-black.svg"
                                        alt=""
                                    ></img>
                                    &nbsp; {element.categoryName}
                                </span>
                            </div>
                        </div>
                        <div className="body__action--title">
                            <h1>{element.titleMemo}</h1>
                        </div>
                        <div className="body__action--content">
                            <p>{element.contentMemo}</p>
                        </div>
                    </div>
                );
            }
        });
        return rs;
    };

    render() {
        return <React.Fragment>{this.show()}</React.Fragment>;
    }
}
const mapStateToProps = state => {
    return {
        data: state.fetchAllDataMemo,
        idClick: state.getActiveMemo,
        showallnote: state.showallnote,
        history: state.history,
    };
};

export default connect(mapStateToProps, null)(MemoContent);
