import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import {Container, Paper, Box, Stack, TextField, Typography, Button} from "@mui/material"
import "./Home.scss"

import ListCal from "./componant/listCal";
import FormNewCal from "./componant/FormNewCal";

export default function Home(){

    const [formCal, setFormCal] = useState(false)

    return (
         <Container sx={{alignItems: "center", display:"flex", justifyContent:"center", minHeight: "100vh"}}>
            <Paper sx={{display: "flex", p:2, flexDirection:"column" }}>
                {formCal === false ? (
                    <ListCal setFormCal={setFormCal} formCal={formCal}/>
                ): (
                    <FormNewCal setFormCal={setFormCal}/>
                )}
            </Paper>
         </Container>
    )
}