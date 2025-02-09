import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
// import reportWebVitals from './reportWebVitals';
import { Toaster } from "react-hot-toast";
import { SurveyNokhbaProvider } from "./context/Questions2Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
        <SurveyNokhbaProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </SurveyNokhbaProvider>
    </LanguageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
