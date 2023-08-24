
import './App.css';

import AppContent from './AppContent';
import ListOfProducts from "./ListOfProducts";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<AppContent />} />
                <Route path="products" element={<ListOfProducts />} />
        {/*<AppContent />*/}
        {/*<ListOfProducts />*/}

        </Routes>
        </BrowserRouter>
        </MantineProvider>
    );
}

export default App;