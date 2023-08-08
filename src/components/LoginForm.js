import * as React from 'react';
import '../style/logStyle.scss'

export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'signup',
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




    render() {

            return (
            <div className="wrapper" id="login-page">

                <div className="form">

                    <div className="form__tabs">
                        <a href="#" onClick={() => this.handleTabClick('signup')} data-target="signup"
                           className="tab active">Signup</a>
                        <a href="#" data-target="login" className="tab">Login</a>
                    </div>


                    <div className="form__content">


                        <div className="form-variant form-variant--signup active" data-id="signup">
                            <form>

                                <div className="input-group input-group-icon">
                                    <label htmlFor="signup-name">Your name</label>
                                    <input type="text" id="signup-name" name="name" placeholder="Your name"
                                           className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/user.svg"
                                                className="input-icon input-icon--name"/>
                                    </div>

                                    <label htmlFor="last-name">Your Lastname</label>
                                    <input type="text" id="last-name" name="lastName" placeholder="Your Last name"
                                           className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/user.svg"
                                                className="input-icon input-icon--name"/>
                                    </div>
                                    //TODO change it for login or add another entity
                                    <label htmlFor="signup-email">Your email</label>
                                    <input type="email" id="signup-email" name="email" placeholder="Your email"
                                           className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/mail.svg"
                                                className="input-icon input-icon--email"></object>
                                    </div>

                                    <label htmlFor="signup-password">New password</label>
                                    <input type="password" id="signup-password" name="password"
                                           placeholder="Your password" className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/password.svg"
                                                className="input-icon input-icon--password"></object>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <input type="submit" className="input-field input-field--submit"
                                           value="Sign up"/>
                                </div>
                            </form>
                        </div>

                        <div className="form-variant form-variant--login" data-id="login">
                            <h2 className="text-center">Login</h2>
                            <form>
                                <div className="input-group input-group-icon">
                                    <label htmlFor="login-email">Your email</label>
                                    <input type="email" id="login-email" name="email" placeholder="Your email"
                                           className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/mail.svg"
                                                className="input-icon input-icon--email"></object>
                                    </div>
                                </div>

                                <div className="input-group input-group-icon">
                                    <label htmlFor="login-password">Password</label>
                                    <input type="password" id="login-password" name="password"
                                           placeholder="Your password" className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml" data="/public/images/password.svg"
                                                className="input-icon input-icon--password"/>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <input type="submit" className="input-field input-field--submit" value="Login"/>
                                </div>
                            </form>

                            <a href="#" data-target="forgot" className="tab text-center forgot-link">Forgot
                                password?</a>
                        </div>


                        <div className="form-variant form-variant--forgot" data-id="forgot">
                            <h2 className="text-center">Forgot your password?</h2>
                            <form>

                                <div className="input-group input-group-icon">
                                    <label htmlFor="forgot-email">Your email</label>
                                    <input type="email" id="forgot-email" name="email" placeholder="Your email"
                                           className="input-field"/>
                                    <div className="input-icon">
                                        <object type="image/svg+xml"
                                                data="/public/images/mail.svg"
                                                className="input-icon input-icon--email"/>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <input type="submit" className="input-field input-field--submit"
                                           value="Recover password"/>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );

    }
}