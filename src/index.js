import React from "react";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import 'bootstrap/dist/css/bootstrap.min.css';

const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
};



  ReactDOM.render(
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

reportWebVitals();
