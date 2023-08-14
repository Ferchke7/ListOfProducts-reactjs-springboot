import * as React from "react";
import {request, setAuthHeader} from "../axiosFile/axios_helper";

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginComponents/LoginForm';
import ListOfProducts from "./ListOfProducts";
import CreateProducts from "./creatProduct/CreateProducts";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        }
    };

    login = () => {
        this.setState({componentToShow: "login"})
    };

    createProduct = () => {
        this.setState({componentToShow: "create"})
    }

    logout = () => {
        this.setState({componentToShow: "welcome"})
        setAuthHeader(null);
    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                setAuthHeader(null);
                this.setState({componentToShow: "welcome"})
            }
        );
    };

    onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                setAuthHeader(null);
                this.setState({componentToShow: "welcome"})
            }
        );
    };

    render() {
        return (
            <>
                <Buttons
                    login={this.login}
                    logout={this.logout}
                    create={this.createProduct}
                />

                {this.state.componentToShow === "welcome" && <ListOfProducts />}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {this.state.componentToShow === "messages" && <AuthContent />}
                {this.state.componentToShow === "create" && <CreateProducts />}
            </>
        );
    };
}