import React, { Component } from "react";
import { connect } from "react-redux";
import "./PaintBrushSolid.css";
import { actSetColorPage } from "../../actions/index";

class PaintBrushSolid extends Component {
    static defaultProps = {
        colorOptions: [
            { name: "LightSalmon", value: "LightSalmon" },
            { name: "FireBrick", value: "FireBrick" },
            { name: "DarkSeaGreen", value: "DarkSeaGreen" },
            { name: "LightCyan", value: "LightCyan" },
            { name: "BlueViolet", value: "BlueViolet" },
            { name: "PapayaWhip", value: "PapayaWhip" },
            { name: "LightGreen", value: "LightGreen" },
            { name: "Pink", value: "Pink" },
            { name: "Green", value: "#313F46" },

        ]
    };
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            initialColor: "",
            site: ""
        };
    }

    componentDidMount() {
        this.props.setColorPage(this.state.site);
    }
    setColorPage = () => {
        this.props.setColorPage(this.state.site);
    };

    setColorReset = () => {
        this.props.setColorPage("#F4F4F4");
    };

    onChangeTheme = event => {
        this.setState({
            site: event.currentTarget.value
        });
    };
    showColorOptions = () => {
        let rs = [];
        let { colorOptions } = this.props;

        colorOptions.map((item, index) =>
            rs.push(
                <div key={index} className="theme-config--color__item">
                    <input
                        type="radio"
                        id={`${index}`}
                        name={`${item.name}`}
                        value={`${item.value}`}
                        onChange={e => this.onChangeTheme(e)}
                        checked={this.state.site === item.value}
                    ></input>
                    <label htmlFor={`${index}`}>{item.name}</label>
                </div>
            )
        );

        return rs;
    };
    openAndClose = () => {
        let { isActive } = this.state;
        this.setState({
            isActive: !isActive
        });
    };
    render() {
        return (
            <div
                className={
                    this.state.isActive === false
                        ? "them-config active-them-config"
                        : "them-config "
                }
            >
                <button
                    onClick={this.openAndClose}
                    className="them-config-button"
                >
                    <img src="/images/paint-brush-solid.svg" alt=""></img>
                </button>
                <div className="theme-config--color">
                    <b>Header Color</b>
                    {this.showColorOptions()}
                    <input
                        className="change"
                        onClick={this.setColorPage}
                        type="submit"
                        value="Change"
                    ></input>
                    <input
                        className="change"
                        onClick={this.setColorReset}
                        type="submit"
                        value="Reset"
                    ></input>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setColorPage: color => {
            dispatch(actSetColorPage(color));
        }
    };
};

export default connect(null, mapDispatchToProps)(PaintBrushSolid);
