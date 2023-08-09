import * as React from "react";

export default function SignLoginButtons(props) {
    return (
        <div className="row">
            <div className="col-md-12 text-center" style={{ marginTop: '30px' , }}>
                <button className="btn btn-primary" style={{ margin: '10px' }} onClick={props.signup}>
                    Sign up
                </button>
                <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.forgotPassword}>
                    Forgot password
                </button>
                <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.login}>
                   Login
                </button>
                <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};
// <div className="form__tabs">
//     <a href="#" data-target="signup"
//        className="tab active">Signup</a>
//     <a href="#" data-target="login" className="tab">Login</a>
// </div>