import ChildCareIcon from "@mui/icons-material/ChildCare";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BedIcon from '@mui/icons-material/Bed';
import DeleteIcon from '@mui/icons-material/Delete';

import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"

export function CardResa ({data, handleDelete}: any ){

    const {nb_children, nb_adult, nb_bedroom, title, start, end, status, calId, backgroundColor, borderColor, allHome, userby, id} = data

    return (
        <Paper elevation={0} sx={{ my: 1, p: 1.5, backgroundColor, border: `1px solid ${borderColor}`, borderRadius: 2, color: "white", transition: "all 0.2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 3,},
        }}>
            <Stack direction="row" sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{ fontWeight: 600, fontSize: "14px", }}>{title}</Typography>
                <Typography>{start.slice(5,10)} ➜ {end.slice(5,10)}</Typography>
                {status === "validé" ? (
                    <Typography><CheckCircleIcon/></Typography>
                ):(
                    <Typography><HourglassBottomIcon/></Typography>
                )}
            </Stack>
            <Stack direction="row"spacing={2}sx={{ mt: 0.5 }}>
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
                {userby && (
                    <Typography variant="caption">by: {userby}</Typography>
                )}
                <Button type="button" onClick={() => handleDelete(id, calId)}><DeleteIcon/></Button>
            </Stack>
        </Paper>
    );
}