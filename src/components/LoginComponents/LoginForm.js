import * as React from 'react';

import SignLoginButtons from "./SignLoginButtons";
import SignupContent from "./SignupContent";
import ForgotPassword from "./ForgotPassword";
import LoginContent from "./LoginContent";


export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            componentToShow: 'signup',
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    handleTabClick = (tabId) => {
        this.setState({activeTab: tabId});
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        this.state.onRegister(e, this.state.firstName, this.state.lastName, this.state.login, this.state.password);
    };

    showLogin = () => {
        this.setState({ componentToShow: "login" });
    };

    showSignup = () => {
        this.setState({ componentToShow: "signup" });
    };

    showForgot = () => {
        this.setState({ componentToShow: "forgotPassword" });
    };

    render() {
        return (
            <>
                <SignLoginButtons
                    Login={this.showLogin}
                    signup={this.showSignup}
                    forgotPassword={this.showForgot}
                />

                {this.state.componentToShow === "signup" && <SignupContent />}
                {this.state.componentToShow === "login" && (
                    <LoginContent
                        onLogin={this.onSubmitLogin} // Changed from this.onLogin
                        onRegister={this.onSubmitRegister} // Changed from this.onRegister
                    />
                )}
                {this.state.componentToShow === "forgotPassword" && <ForgotPassword />}
            </>
        )
    }
}