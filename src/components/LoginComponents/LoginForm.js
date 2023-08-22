import React, { useState } from "react";
import { Button } from '@mantine/core';
import { Tabs } from '@mantine/core';


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
                <Tabs active={active} onTabChange={setActive}>
                    <Tabs.List>
                        <Tabs.Tab value="login">Login</Tabs.Tab>
                        <Tabs.Tab value="register">Register</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="login">
                        <form onSubmit={onSubmitLogin}>
                            <p className="title">Login</p>
                            <div className="RegForm">
                                <input type="text" name="login" placeholder="Username" onChange={onChangeHandler} />
                                <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel value="register">
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
                                    <Button type="submit">Submit</Button>
                                </div>
                            </div>
                        </form>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}
