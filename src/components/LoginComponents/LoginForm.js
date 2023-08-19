import React, {useState} from "react";
import "./LoginForm.css";
import classNames from "classnames";

export default function LoginForm({ onLogin, onRegister }) {
    const [active, setActive] = useState("login");
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        login: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        const { login, password } = formData;
        onLogin(login, password); // Call the onLogin prop function
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        const { firstName, email, login, password } = formData;
        onRegister(firstName, email, login, password); // Call the onRegister prop function
    };

    return (
        <div className="row justify-content-center">
            <div>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "login" ? "active" : "")}
                                id="tab-login"
                                onClick={() => setActive("login")}>Login
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "register" ? "active" : "")}
                                id="tab-register"
                                onClick={() => setActive("register")}>Register
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    {active === "login" && (
                        <div className={classNames("tab-pane", "fade", active === "login" ? "show active" : "")}
                             id="pills-login">
                            <form onSubmit={onSubmitLogin}>
                                <p className="title">Login</p>
                                <div className="RegForm">
                                    <input type="text" name="login" placeholder="Username" onChange={onChangeHandler} />
                                    <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    )}
                    {active === "register" && (
                        <div className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")}
                             id="pills-register">
                            <form onSubmit={onSubmitRegister}>
                                <div className="App">
                                    <p className="title">Registration Form</p>
                                    <div className="RegForm">
                                        <input type="text" name="firstName" placeholder="First Name" onChange={onChangeHandler} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={onChangeHandler}
                                        />
                                        <span style={{ color: "white" }} className="error-message">
                                            *Email* is mandatory
                                        </span>
                                        <input type="text" name="login" placeholder="Username" onChange={onChangeHandler} />
                                        <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
                                        <input type="submit" value="Submit" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}