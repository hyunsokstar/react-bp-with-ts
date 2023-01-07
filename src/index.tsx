import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";
import { createRoot } from "react-dom/client";

// const darkTheme = {
//     textColor: "whitesmoke",
//     backgroundColor: "#111",
// };

// const lightTheme = {
//     textColor: "#111",
//     backgroundColor: "whitesmoke",
// };

// ReactDOM.render(
//     <React.StrictMode>
//         <ThemeProvider theme={darkTheme}>
//             <App />
//         </ThemeProvider>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
