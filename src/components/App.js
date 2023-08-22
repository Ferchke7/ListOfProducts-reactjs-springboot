
import './App.css';

import AppContent from './AppContent';
import ListOfProducts from "./ListOfProducts";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

function App() {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
        <div className="App">

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent />
                        <ListOfProducts />
                    </div>
                </div>
            </div>
        </div>
        </MantineProvider>
    );
}

export default App;