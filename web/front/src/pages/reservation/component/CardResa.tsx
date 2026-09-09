import ChildCareIcon from "@mui/icons-material/ChildCare";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BedIcon from '@mui/icons-material/Bed';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventNoteIcon from "@mui/icons-material/EventNote";
import {useState }            from    "react";
import PopupTodo from "./PopupTodo";


import {Container, Paper, Box, Stack, Typography, Button, Popper} from "@mui/material"

export function CardResa ({data, handleDelete}: any ){

    const {nb_children, nb_adult, nb_bedroom, title, start, end, status, task, calId, backgroundColor, borderColor, allHome, encours, id} = data
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        console.log("coucou")
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return (
        <>
        <Paper elevation={0} sx={{ maxHeight: 100, my: 1, p: 1.5, backgroundColor, border: `1px solid ${borderColor}`, borderRadius: 2, color: "white", transition: "all 0.2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 3,},
        }}>
            <Stack direction="row" sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px", }}>{title}</Typography>
                <Typography>{start.slice(5,10)} ➜ {end.slice(5,10)}</Typography>
                {encours == true ? (
                      <Typography><EventIcon /></Typography>
                ):(
                    status === "validé" ? (
                        <Typography><EventAvailableIcon/></Typography>
                    ):(
                        <Typography><HourglassBottomIcon/></Typography>
                    )
                )}
            </Stack>
            <Stack direction="row"spacing={2}sx={{ mt: 0.5 }}>
                <Stack direction="row" spacing={{xs: 0.5, sm: 2}} sx={{display: "flex", my:{xs: 1, sm: 0}}}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5,}}>
                    <PersonIcon sx={{ fontSize: 17 }} />
                    <Typography variant="caption">{nb_adult}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                >
                    <ChildCareIcon sx={{ fontSize: 17 }} />
                    <Typography variant="caption">
                        {nb_children}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                >
                    <BedIcon sx={{ fontSize: 17 }} />
                    <Typography variant="caption">
                        {nb_bedroom}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                >
                    <HomeFilledIcon sx={{ fontSize: 17 }} />
                    <Typography variant="caption">
                        {allHome}
                    </Typography>
                </Box>
                </Stack>
                <Stack direction="row" spacing={2}     sx={{display: "flex",alignItems: "center",justifyContent: {xs: "center",sm: "flex-start",}, mt: {xs: 1,sm: 0,},}}>
                    <Button type="button" sx={{color:'white'}} onClick={() => handleDelete(id, calId)}><DeleteIcon/></Button>
                    {task.length > 0 && encours && (
                        <Button aria-describedby={id} sx={{color:'white'}} type="button" onClick={handleClick}><ListAltIcon/></Button>
                    )}
                </Stack>
            </Stack>
        </Paper>
        <PopupTodo task={task} open={open} setOpen={setOpen}/>
        </>
    );
}