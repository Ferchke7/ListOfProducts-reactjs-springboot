
import './App.css';

import AppContent from './AppContent';
import ListOfProducts from "./ListOfProducts";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersProduct from "./userInfo/UsersProduct";
import {GoogleOAuthProvider} from "@react-oauth/google";




function App() {
    return (
        <GoogleOAuthProvider clientId={"374318802758-60ujmcrejovugs9tokv7uba6bg8p0d7i.apps.googleusercontent.com"}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppContent />} />
                <Route path="products" element={<ListOfProducts />} />
            <Route path="myproducts" element={<UsersProduct />} />
            <Route path="sign-in" element={<AppContent />} ></Route>
        </Routes>
        </BrowserRouter>
        </MantineProvider>
        </GoogleOAuthProvider>
    );
}

export default App;