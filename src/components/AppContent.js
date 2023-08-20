import * as React from "react";
import {getAuthToken, request, setAuthHeader} from "../axiosFile/axios_helper";
import Buttons from './Buttons';
import { Button, Group, Collapse, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState} from "react";
import LoginForm from "./LoginComponents/LoginForm";
import CreateProducts from "./creatProduct/CreateProducts";
import UsersProduct from "./userInfo/UsersProduct";




export default function AppContent() {

    const [componentToShow, setComponentToShow] = useState("main");

    const [isAuthenticated, setAuthentication] = useState(getAuthToken() !== null && getAuthToken() !== "null");
    const [authenticatedUserLogin, setAuthenticatedUserLogin] = useState(null)
    const [opened, { toggle }] = useDisclosure(false);
    const [userId, setUserId] = useState()
    const login = () => {
        setComponentToShow("login");
    };
    const createProduct = () => {
        setComponentToShow("create")
    }


    const logout = () => {
        setComponentToShow("main");
        setAuthenticatedUserLogin(null)
        setAuthHeader(null);
        setAuthentication(false);
    };
    const myProducts = () => {
        setComponentToShow("myproducts")
        console.log(userId)
    }
    const handleLogin = (login, password) => {
        request("POST", "/login", {
            login: login,
            password: password,
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setAuthenticatedUserLogin(login)
                setAuthentication(true);
                setUserId(response.data.id)
                setComponentToShow("authenticated");
            })
            .catch(() => {
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
                setAuthenticatedUserLogin(login)
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
                <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
            )}
            {componentToShow === "create" && (<CreateProducts authToken={getAuthToken()}
                                                              authenticatedUserLogin={authenticatedUserLogin} />)}
            {componentToShow === "main" && <p>It is main </p>}
            {componentToShow === "authenticated" && (
                <p>Welcome {authenticatedUserLogin}</p>
            )
            }
            {componentToShow === "myproducts" && (

                <Box maxWidth={400} mx="auto">
                    <Group position="center" mb={5}>
                        <Button onClick={toggle} >Show my Product</Button>
                    </Group>

                    <Collapse in={opened}>

                        <UsersProduct userId={userId} />
                    </Collapse>
                </Box>
            )}
            {componentToShow === "registered" && <p>You've been registered your as {authenticatedUserLogin}</p>}
            {componentToShow === "noUser" && <p>User not found or wrong password!</p>}
        </>
    );
}