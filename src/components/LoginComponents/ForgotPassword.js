import * as React from "react";

export default class ForgotPassword extends React.Component {
    render() {
        return (
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
        )
    }
}