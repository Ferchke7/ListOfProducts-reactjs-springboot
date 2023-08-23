import React, { useEffect, useState } from "react";
import { getAuthToken, request, setAuthHeader } from "../axiosFile/axios_helper";
import { Button, Group, Collapse, Box, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import Buttons from './Buttons';
import LoginForm from "./LoginComponents/LoginForm";
import UsersProduct from "./userInfo/UsersProduct";
import CreateProducts from "./creatProduct/CreateProducts";

export default function AppContent() {
    const [componentToShow, setComponentToShow] = useState("main");
    const isAuthenticated = getAuthToken() !== null && getAuthToken() !== "null";
    const [authenticatedUserLogin, setAuthenticatedUserLogin] = useState(null);
    const [opened, { toggle }] = useDisclosure(false);
    const userId = localStorage.getItem("userId");
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)


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
        setAuthHeader(null);
    };

    const myProducts = () => {
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
                        title="Register or Login"
                        overlayProps={{ opacity: 0.5, blur: 4 }}
                        transitionProps={{ transition: 'rotate-left',
                            duration: 150,
                            timingFunction: 'linear' }}>
                    <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
                </Drawer>
            )}

            {componentToShow === "create" && (
                <Drawer opened={openCreate} position={"left"} onClose={() => setOpenCreate(false)}
                        title="Create a product"
                        overlayProps={{ opacity: 0.5, blur: 4 }}
                        transitionProps={{ transition: 'rotate-left',
                            duration: 150,
                            timingFunction: 'linear' }}>
                <CreateProducts authToken={getAuthToken()} authenticatedUserLogin={authenticatedUserLogin} />
                </Drawer>
            )}
            {componentToShow === "main" && <p>It is main {authenticatedUserLogin}</p>}
            {componentToShow === "myproducts" && (
                <Box maxWidth={400} mx="auto">
                    <Group>
                        <Button onClick={toggle}>Show my Product</Button>
                    </Group>
                    <Collapse in={opened}>
                        <UsersProduct userId={userId} />
                    </Collapse>
                </Box>
            )}
        </>
    );
}
