import React, { Component } from 'react';

class LoginSignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'signup',
        };
    }

    handleTabClick = (tabId) => {
        this.setState({activeTab: tabId});
    };
}
export default LoginSignupForm;
