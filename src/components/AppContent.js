import * as React from "react";
import {request, setAuthHeader} from "../axiosFile/axios_helper";
import Buttons from './Buttons';

import {useState} from "react";
import LoginForm from "./LoginComponents/LoginForm";




export default function AppContent() {

    const [componentToShow, setComponentToShow] = useState("main");

    const [isAuthenticated, setAuthentication] = useState(false);

    const login = () => {
        setComponentToShow("login");
    };

    const logout = () => {
        setComponentToShow("main");
        setAuthHeader(null);
        setAuthentication(false);
    };

    const handleLogin = (login, password) => {
        request("POST", "/login", {
            login: login,
            password: password,
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setAuthentication(true);
                setComponentToShow("authenticated");
            })
            .catch(() => {
                setAuthHeader(null);
                setComponentToShow("main");
            });
    };

    const handleRegister = (firstName, email, login, password) => {
        request("POST", "/register", {
            firstName: firstName,
            email: email,
            login: login,
            password: password,
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setComponentToShow("registered");
            })
            .catch(() => {
                setAuthHeader(null);
                setComponentToShow("main");
            });
    };

    return (
        <>
            <Buttons
                login={login}
                logout={logout}
                isAuthenticated={isAuthenticated}
            />
            {componentToShow === "login" && (
                <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
            )}
            {componentToShow === "main" && <p>It is main</p>}
            {componentToShow === "authenticated" && <p>You've auth</p>}
            {componentToShow === "registered" && <p>You've registered</p>}
        </>
    );
}