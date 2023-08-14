import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import classNames from "classnames";

export default function LoginForm({ onLogin, onRegister }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [active, setActive] = useState("login");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "login":
                setLogin(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        onLogin(login, password);
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        onRegister(firstName, lastName, login, password);
    };
        const onSubmit = (data) => console.log(data);

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
                                <form className="RegForm" onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" {...register("name")} placeholder="Name" />

                                    <input type="password" {...register("password")} placeholder="Password" />
                                    <input type="submit" value="Submit" />
                                </form>
                            </form>
                        </div>
                        )}
                        {active === "register" && (
                        <div className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")}
                             id="pills-register">
                            <form onSubmit={onSubmitRegister}>
                                <div className="App">

                                    <p className="title">Registration Form</p>

                                    <form className="RegForm" onSubmit={handleSubmit(onSubmit)}>
                                        <input type="text" {...register("name")} placeholder="Name" />
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            placeholder="Email"
                                        />
                                        <span style={{ color: "white" }} className="error-message">
                                            *Email* is mandatory
                                        </span>
                                        <input type="password" {...register("password")} placeholder="Password" />
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                            </form>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
