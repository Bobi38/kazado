import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import {toast} from "sonner"


type Props ={
    id: string | undefined;
    setEvent: (mod: string)=> void;
    home: [] | never[];
    today: string
}

export default function HomeAdm({id, setEvent, home, today}: Props){

    return (
        
    )
}