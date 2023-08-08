import * as React from 'react';
import '../../style/logStyle.scss'

export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'signup',
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    handleTabClick = (tabId) => {
        this.setState({activeTab: tabId});
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        this.state.onRegister(e, this.state.firstName, this.state.lastName, this.state.login, this.state.password);
    };




    render() {

           return (
               <>
               </>
           )

    }
}