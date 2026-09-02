import { createTheme, ThemeProvider } from "@mui/material/styles";


declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        valid: true;
        delete: true;
        redir: true;
        close: true;
        addResa: true;
    }
}

declare module "@mui/material/styles" {
    interface TypographyVariants {
        h3Custom: React.CSSProperties;
        FormTitle: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h3Custom?: React.CSSProperties;
        FormTitle: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h3Custom: true;
        FormTitle: true;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        h3Custom: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#7C9D96",
        },
        FormTitle: {
            fontSize: "20px",
            fontWeight: 700,
            color: "#7C9D96",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "'Trebuchet MS', sans-serif",
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: "valid" },
                    style: {
                        backgroundColor: "#7C9D96",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        marginTop: "1rem",

                        "&:hover": {
                            backgroundColor: "#6B8B84",
                        },
                    },
                },
                {
                    props: { variant: "delete" },
                    style: {
                        backgroundColor: "#9D7C83",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        marginTop: "1rem",

                        "&:hover": {
                            backgroundColor: "#6B8B84",
                        },
                    },
                },
                {
                    props: { variant: "redir" },
                    style: {
                        backgroundColor: "#acaeae",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        marginTop: "1rem",

                        "&:hover": {
                            backgroundColor: "#454a49",
                        },
                    },
                },
{
                    props: { variant: "close" },
                    style: {
                        minWidth: "32px",
                        width: "32px",
                        height: "32px",
                        padding: 0,

                        backgroundColor: "transparent",
                        color: "#9D7C83",

                        border: "none",
                        borderRadius: "50%",

                        fontSize: "1.2rem",
                        fontWeight: 700,
                        lineHeight: 1,

                        textTransform: "none",

                        "&:hover": {
                            backgroundColor: "#7C9D96",
                            color: "white",
                        },
                    },
                },
                {
                props: { variant: "addResa" },
                style: {
                    minWidth: "48px",
                    width: "48px",
                    height: "48px",
                    padding: 0,

                    borderRadius: "50%",

                    backgroundColor: "#7C9D96",
                    color: "white",

                    boxShadow: "0 4px 12px rgba(124, 157, 150, 0.25)",

                    transition: "all 0.2s ease",

                    "&:hover": {
                        backgroundColor: "#6B8B84",
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 16px rgba(124, 157, 150, 0.3)",
                    },

                    "&:active": {
                        transform: "scale(0.95)",
                    },
                },
            },
            ],
        },
    },
});

export default theme