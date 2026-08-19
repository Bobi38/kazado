import { useNavigate, useLocation}      from    "react-router-dom";
import {Container, Paper, Box, Stack, TextField, Typography, Button} from "@mui/material"
import { useEffect, useRef, useState }            from    "react";
import { VscEye, VscEyeClosed }     from    "react-icons/vsc";
// import socketStore from "../../../Composant/context/socketContext";
import "./Login.scss"


export default function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    // const send = socketStore((state) => state.send);

    // const testSocket = () => {
    //     console.log("testSocket")
    //     send("TEST", { payload: "Hello from Login", test: "attention la team" });
    // };

    const login_submit = async (e: any) =>{
        try{
            e.preventDefault()
            const form = e.target;
            const data = {
                email: form.email.value,
                password: form.password.value,
            }

            if (!data.email || !data.password )
                return ;

            const url = `/api/user/login`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            if (!ret.success){
                console.log(`front register success false: ${ret.message}`)
            }

            if (ret.success)
                navigate("/")
            else 
                console.log(`front register success false: ${ret.message}`)
        }catch(err){
            console.log(`Register error TRY ${err}`)
        }

    }

    return (
        <Container sx={{alignItems: "center", display:"flex", justifyContent:"center", minHeight: "100vh"}}>
            <Paper sx={{display: "flex", p:2, alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                <Typography variant="h3Custom" align="center">Login</Typography>
                <form onSubmit={(e) => {login_submit(e)}}>
                    <Stack sx={{p:2}} spacing={2} >
                        <TextField
                            type="email"
                            id="email"
                            label="email"
                            required/>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            label="password"
                            id="password"
                            required/>
                     <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                         {showPassword ? <VscEyeClosed /> : <VscEye />}
                     </span>
                </Stack>
                <Box sx={{display:"flex", justifyContent:"center", gap:2}} >
                    <Button type="submit" variant="valid">Connect</Button>
                    <Button type="button" variant="redir" onClick={() => navigate("/register")}>Register</Button>
                </Box>
                 </form>
            </Paper>
        </Container>
    )
}