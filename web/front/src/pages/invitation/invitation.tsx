import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import { WaitingInvit } from "./component/WaitingInvit";
import { SendInvit } from "./component/SendInvit";


export default function Invitation (){


    const [sentInvitations, setSentInvitations] = useState([]);



    return (
        <Container sx={{minHeight:"100vh"}}>
            <Paper sx={{p:2}}>
            <Typography variant="h3Custom">Mes invitations</Typography>
            <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
            <Typography variant="FormTitle">En attente</Typography>
            <WaitingInvit/>
            <Typography variant="FormTitle">Envoyé</Typography>
            <SendInvit/>
            </Paper>
        </Container>

    )
}