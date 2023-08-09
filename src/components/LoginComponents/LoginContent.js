import * as React from "react";

export default class LoginContent extends React.Component {
    render() {

        return (
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

        );

    }
}