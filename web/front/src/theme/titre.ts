import { createTheme, ThemeProvider } from "@mui/material/styles";


declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        valid: true;
        redir: true;
    }
}

declare module "@mui/material/styles" {
    interface TypographyVariants {
        h3Custom: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h3Custom?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h3Custom: true;
    }
}

const theme = createTheme({
    typography: {
        h3Custom: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#7C9D96",
        },
    },
    components: {
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
            ],
        },
    },
});

export default theme