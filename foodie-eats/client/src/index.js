import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
