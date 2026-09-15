import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Container, Paper, Box, Stack, TextField, Typography, Button } from "@mui/material"
import { toast } from 'sonner'

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const searchParams = useSearchParams()
    const token = searchParams.get("token");


    const handlePasswordChange = async (pass: string) => {
        try{
            const url = `/api/user/passwordreset`
            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token, password: pass})
            })
            const ret = await rep.json()
            if (!ret.success){
                toast.error(`front register success false: ${ret.message}`)
                return
            }
            toast.success("Password reset successful! Redirecting to login...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }catch(err){
            console.log(`Password reset error: ${err}`)
        }   
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        await handlePasswordChange(password)
    }

    return (
        <Container sx={{alignItems: "center", display:"flex", justifyContent:"center", minHeight: "100vh"}}>
            <Paper sx={{display: "flex", p:2, alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                <Typography variant="h3Custom" align="center">Reset Password</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack sx={{p:2}} spacing={2} >
                        <TextField
                            type="password"
                            label="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            type="password"
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained">Reset Password</Button>
                    </Stack>
                </form>
                {success && <Typography color="success.main">{success}</Typography>}
            </Paper>
        </Container>
    )
}