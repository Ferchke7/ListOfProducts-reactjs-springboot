
import './App.css';

import AppContent from './AppContent';
import ListOfProducts from "./ListOfProducts";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import UsersProduct from "./userInfo/UsersProduct";
import FacebookLogin from "./LoginComponents/FacebookLogin";
import GoogleLogin from "./LoginComponents/GoogleLogin";

function App() {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<AppContent />} />
                <Route path="products" element={<ListOfProducts />} />
            <Route path="myproducts" element={<UsersProduct />} />
            <Route path="/oauth2/authorization/facebook" component={FacebookLogin} />
            <Route path="google" component={GoogleLogin} />
        </Routes>
        </BrowserRouter>
        </MantineProvider>
    );
}

export default App;