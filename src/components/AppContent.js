import React, { useEffect, useState } from "react";
import { getAuthToken, request, setAuthHeader } from "../axiosFile/axios_helper";
import { Drawer } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Buttons from './Buttons';
import LoginForm from "./LoginComponents/LoginForm";
import UsersProduct from "./userInfo/UsersProduct";
import CreateProducts from "./creatProduct/CreateProducts";
import ListOfProducts from "./ListOfProducts";

export default function AppContent() {
    const [componentToShow, setComponentToShow] = useState("main");
    const isAuthenticated = getAuthToken() !== null && getAuthToken() !== "null";
    const [authenticatedUserLogin, setAuthenticatedUserLogin] = useState(null);
    const [opened, setOpened] = useState(false);
    const userId = localStorage.getItem("userId");
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const userLogin = localStorage.getItem("userLogin")

    useEffect(() => {
        const showNotification = (title, message, styles) => {
            const notificationId = notifications.show({
                title,
                message,
                styles,
            });

            setTimeout(() => {
                notifications.hide(notificationId);
            }, 5000);
        };


        if (authenticatedUserLogin != null && componentToShow === "authenticated") {
            showNotification("You've been logged in", `Hello ${authenticatedUserLogin}`);
        }
        if (componentToShow === "registered") {
            showNotification("You've been registered", `as ${authenticatedUserLogin}`);
        }
        if (authenticatedUserLogin == null && componentToShow === "noUser") {
            showNotification("The user doesn't exist!", theme => ({
                root: {
                    backgroundColor: theme.colors.red[6],
                },
                title: { color: theme.white }
            }));
        }
    }, [componentToShow, authenticatedUserLogin]);

    const login = () => {
        setComponentToShow("login");
        setOpenDrawer(true)
    };

    const createProduct = () => {
        setComponentToShow("create");
        setOpenCreate(true)
    };

    const logout = () => {
        setComponentToShow("main");
        setAuthenticatedUserLogin(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("userLogin")
        setAuthHeader(null);
    };

    const myProducts = () => {
        setOpened(true)
        setComponentToShow("myproducts");

    };

    const handleLogin = (login, password) => {
        console.log("Logging in with:", login, password);

        request("POST", "/login", {
            login: login,
            password: password,
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setAuthenticatedUserLogin(login);
                setComponentToShow("authenticated");
                localStorage.setItem("userId", response.data.id.toString());
                localStorage.setItem("userLogin",response.data.login.toString())
            })
            .catch((error) => {
                console.error("Login failed:", error);
                setAuthHeader(null);
                setComponentToShow("noUser");
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
                setAuthenticatedUserLogin(login);
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
                create={createProduct}
                myProducts={myProducts}
                isAuthenticated={isAuthenticated}
            />
            {componentToShow === "login" && (
                <Drawer opened={openDrawer} position={"left"} onClose={() => setOpenDrawer(false)}

                        overlayProps={{ opacity: 0.5, blur: 4 }}
                        transitionProps={{ transition: 'rotate-left',
                            duration: 150,
                            timingFunction: 'linear' }}>
                    <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
                </Drawer>
            )}

            {componentToShow === "create" && (
                <Drawer opened={openCreate} position={"left"} onClose={() => setOpenCreate(false)}
                        overlayProps={{ opacity: 0.5, blur: 4 }}
                        transitionProps={{ transition: 'rotate-left',
                            duration: 170,
                            timingFunction: 'linear' }}>
                <CreateProducts authToken={getAuthToken()} />
                </Drawer>
            )}
            {componentToShow === "main" && <p>It is main {authenticatedUserLogin}</p>}
            {componentToShow === "myproducts" && (
                <Drawer opened={opened} position={"left"} onClose={() => setOpened(false)}
                        overlayProps={{ opacity: 0.5, blur: 1 }}
                        transitionProps={{ transition: 'rotate-left',
                            duration: 170,
                            timingFunction: 'linear' }}>
                    <UsersProduct userId={userId} />
                </Drawer>
            )}
            <ListOfProducts></ListOfProducts>
        </>
    );
}
