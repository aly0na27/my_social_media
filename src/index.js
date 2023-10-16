import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    //         <BrowserRouter>
    //             <Provider store={store}>
                    <App/>
                // </Provider>
            // </BrowserRouter>
    // </React.StrictMode>
);

reportWebVitals();