import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import { VscEye, VscEyeClosed }     from    "react-icons/vsc";
import {Container, Paper, Box, Stack, TextField, Typography, Button} from "@mui/material"
import "./Register.scss"


export default function Register(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const register_submit = async (e: any) =>{
        try{
            e.preventDefault()
            const form = e.target;
            const data = {
                email: form.email.value,
                password: form.password.value,
                username: form.username.value
            }

            if (!data.email || !data.password || !data.username)
                return ;

            const url = `/api/user/register`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            if (ret.success)
                navigate("/login")
        }catch(err){
            console.log(`Register error TRY ${err}`)
        }

    }

    return (
        <Container sx={{alignItems: "center", display:"flex", justifyContent:"center", minHeight: "100vh"}}>
            <Paper sx={{display: "flex", p:2, alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                <Typography variant="h3Custom" align="center">Register</Typography>
                <form onSubmit={(e) => {register_submit(e)}}>
                    <Stack sx={{p:2, "& .MuiInputBase-input::placeholder": {fontSize: "10px"}}} spacing={2} >
                        <TextField
                            type="username"
                            id="username"
                            label="username"
                            placeholder="Only letter, number or underscore"
                            required/>
                        <TextField
                            type="email"
                            id="email"
                            label="email"
                            required/>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            label="password"
                            id="password"
                            placeholder="1 number, min 4 carac"
                            required/>
                     <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                         {showPassword ? <VscEyeClosed /> : <VscEye />}
                     </span>
                </Stack>
                <Box sx={{display:"flex", justifyContent:"center", gap:2}} >
                    <Button type="submit" variant="valid">Valider</Button>
                    <Button type="button" variant="redir" onClick={() => navigate("/login")}>Login</Button>
                </Box>
                 </form>
            </Paper>
        </Container>
    )
}