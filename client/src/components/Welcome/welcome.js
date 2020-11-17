import React, { Component } from "react";
import "./welcome.css";
import { FormattedMessage } from "react-intl";
class welcome extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="welcome">
                    <b>
                        <FormattedMessage
                            id="WELCOME_TO_OUR_WEB_APP"
                            defaultMessage="WELCOME_TO_OUR_WEB_APP"
                        >
                            {x => x}
                        </FormattedMessage>
                    </b>
                    <p>
                        <FormattedMessage
                            id="IT'S_NICE_TO_MEET_YOU"
                            defaultMessage="IT'S_NICE_TO_MEET_YOU"
                        >
                            {x => x}
                        </FormattedMessage>
                        
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

export default welcome;
