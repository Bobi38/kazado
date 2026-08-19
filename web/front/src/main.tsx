import "./styles/index.scss"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/titre.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)