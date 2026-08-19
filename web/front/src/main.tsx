import "./styles/index.scss"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/titre.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
)