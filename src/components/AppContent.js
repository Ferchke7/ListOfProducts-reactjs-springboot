import * as React from "react";
import {request, setAuthHeader, getAuthToken} from "../axiosFile/axios_helper";
import Buttons from './Buttons';

import {useEffect, useState} from "react";
import LoginForm from "./LoginComponents/LoginForm";



export default function AppContent() {
    const [componentToShow, setComponentToShow] = useState("main");
    const [isAuthenticated, setAuthentication] = useState(false)

    const login = () => {
        setComponentToShow("login");
    };

    const logout = () => {
        setComponentToShow("main");
        setAuthHeader(null);
    };

    const handleLogin = (login, password) => {
        request("POST", "/login", {
            login: login,
            password: password,
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setAuthentication(true)
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
            />
            {componentToShow === "login" && (
                <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
            )}
            {componentToShow === "main" && (
                <p>It is main</p>
            )}
            {componentToShow === "authenticated" && (
                <p>You've auth</p>
            )}
            {componentToShow === "registered" && (
                <p>You've registered</p>
            )}
        </>
    );
}

//
// const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [authMessage, setAuthMessage] = useState("");
//
//     useEffect(() => {
//         if (isAuthenticated) {
//             setComponentToShow("welcome");
//         } else {
//             setComponentToShow("");
//         }
//     }, [isAuthenticated]);
//
//     const createProduct = () => {
//         setComponentToShow("create");
//     };
//
//     const logout = () => {
//         setAuthHeader(null);
//         setIsAuthenticated(false);
//         setAuthMessage("");
//     };
//
//     const handleLogin = (username, password) => {
//         request("POST", "/login", {
//             login: username,
//             password: password,
//         })
//             .then((response) => {
//                 setAuthHeader(response.data.token);
//                 setIsAuthenticated(true);
//                 setUsername(username);
//                 setPassword(password);
//                 setAuthMessage(`Successfully entered username: ${username}`);
//             })
//             .catch((error) => {
//                 console.error("Login error:", error);
//                 setIsAuthenticated(false);
//                 setUsername("");
//                 setPassword("");
//                 setAuthMessage("Failed to authenticate. No user found with that information.");
//             });
//     };
//
//     const handleRegister = (firstName, lastName, username, password) => {
//         request("POST", "/register", {
//             firstName: firstName,
//             lastName: lastName,
//             login: username,
//             password: password,
//         })
//             .then((response) => {
//                 setAuthHeader(response.data.token);
//                 setIsAuthenticated(true);
//                 setUsername(username);
//                 setPassword(password);
//                 setAuthMessage(`Successfully entered username: ${username}`);
//             })
//             .catch((error) => {
//                 console.error("Registration error:", error);
//                 setIsAuthenticated(false);
//                 setUsername("");
//                 setPassword("");
//                 setAuthMessage("Failed to register. Please try again.");
//             });
//     };