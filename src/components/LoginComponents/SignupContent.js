import React from 'react'; // Import React
import '../LoginComponents/loginStyle.css'

export default class SignupContent extends React.Component {
    render() {
        return (
            <div className="form-variant form-variant--signup active" data-id="signup">
                <form>
                    <div className="input-group input-group-icon">
                        <label htmlFor="signup-name">Your name</label>
                        <input type="text" id="signup-name" name="name" placeholder="Your name" className="input-field"/>
                        <div className="input-icon">
                            <img src="./public/images/user.svg" alt="User icon" className="input-icon--name" />
                        </div>
                    </div>

                    <div className="input-group input-group-icon">
                        <label htmlFor="last-name">Your Lastname</label>
                        <input type="text" id="last-name" name="lastName" placeholder="Your Last name" className="input-field" />
                        <div className="input-icon">
                            <img src="/public/images/user.svg" alt="User icon" className="input-icon--name" />
                        </div>
                    </div>

                    <div className="input-group input-group-icon">
                        <label htmlFor="signup-email">Your email</label>
                        <input type="email" id="signup-email" name="email" placeholder="Your email" className="input-field" />
                        <div className="input-icon">
                            <img src="/public/images/mail.svg" alt="Mail icon" className="input-icon--email" />
                        </div>
                    </div>

                    <div className="input-group input-group-icon">
                        <label htmlFor="signup-password">New password</label>
                        <input type="password" id="signup-password" name="password" placeholder="Your password" className="input-field" />
                        <div className="input-icon">
                            <img src="/public/images/password.svg" alt="Password icon" className="input-icon--password" />
                        </div>
                    </div>

                    <div className="input-group">
                        <input type="submit" className="input-field input-field--submit" value="Sign up" />
                    </div>
                </form>
            </div>
        );
    }
}

