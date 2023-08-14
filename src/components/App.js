
import './App.css';

import AppContent from './AppContent';
import ListOfProducts from "./ListOfProducts";

function App() {
    return (
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
    );
}

export default App;