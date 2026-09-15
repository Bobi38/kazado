import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Paper, Typography, Stack, TextField, Button, Box } from "@mui/material"
import { toast } from "sonner"

export default function SendMail() {
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()

    const sendMail = async (e: any) => {
        try {
            e.preventDefault()
            if (!email)
                return;
            const url = `/api/user/passwordforget`
            const rep = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const ret = await rep.json()
            if (!ret.success) {
                toast.error(`${ret.message}`)
                return
            }
            toast.success(`Un mail a été envoyé à l'adresse ${email} pour réinitialiser votre mot de passe.`)
        } catch (err) {
            console.log(`SendMail error TRY ${err}`)
        }
    }

    return (
        <Container sx={{alignItems: "center", display:"flex", justifyContent:"center", minHeight: "100vh"}}>
            <Paper sx={{display: "flex", p:2, alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                <Typography variant="h3Custom" align="center">Récupération de mot de passe</Typography>
                <form onSubmit={(e) => {sendMail(e)}}>
                    <Stack sx={{p:2}} spacing={2} >
                        <TextField
                            type="email"
                            id="email"
                            label="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </Stack>
                    <Box sx={{display:"flex", justifyContent:"center", gap:2}} >
                        <Button type="submit" variant="valid">Envoyer</Button>
                        <Button type="button" variant="redir" onClick={() => navigate("/login")}>Retour</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}