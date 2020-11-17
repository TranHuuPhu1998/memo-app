import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { actNewCategoryUI,actNewCategoryRequest } from "../../actions/index";

class NewCategory extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            category: "",
            open: false
        };
    }

    handleClose = () => {
        this.props.NewCategoryUI();
    };

    onChange = e => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    };

    onSaveCategory = () => {
        if(this.state){
            this.props.NewCategory(this.state);
        }
    };

    CloseAndSava=()=>{
        this.handleClose(); 
 
        this.onSaveCategory();
    }
    render() {

        let {open} = this.props.categoryuinew;
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                >

                    <DialogTitle id="alert-dialog-slide-title">
                        New Category
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="category"
                            variant="outlined"
                            name="category"
                            onChange={this.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.CloseAndSava}  color="primary">
                            Oke
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        datas: state.fetchAllDataMemo,
        locale: state.locale,
        categoryuinew: state.categoryuinew
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        NewCategory: data => {
            dispatch(actNewCategoryRequest(data));
        },
        NewCategoryUI: ()=>{
            dispatch(actNewCategoryUI(false))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);
