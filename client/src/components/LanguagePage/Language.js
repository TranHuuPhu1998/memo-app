import React, { Component } from "react";
import "./Language.css";
import { changeLocale } from "../../actions/index";
import { connect } from "react-redux";

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }

    onChangeLang = lang => {
        const { status } = this.state;
        this.props.changeLocale(lang);
        this.setState({ status: !status })
    };

    onOpenClose = () => {
        const { status } = this.state;
        this.setState({ status: !status })
    };
    render() {
        const { status } = this.state;
        return (
            <h1
                className={
                    status === false
                        ? "language language-active"
                        : "language "
                }
            >
                <div className="language-icon" onClick={this.onOpenClose}>
                    <img src="/images/language-solid.svg" alt=""></img>
                </div>
                <div className="language-name">
                    <button style={{ borderTop: '1px solid blue' }} onClick={() => this.onChangeLang("en")}>
                        ENGLISH
                    </button>
                    <button onClick={() => this.onChangeLang("vn")}>
                        VIETNAM
                    </button>
                    <button onClick={() => this.onChangeLang("jp")}>
                        JAPAN
                    </button>
                </div>
            </h1 >
        );
    }
}
const mapStateToProps = state => {
    return {
        locale: state.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLocale: lang => {
            dispatch(changeLocale(lang));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
