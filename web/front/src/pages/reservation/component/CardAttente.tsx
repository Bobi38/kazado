import ChildCareIcon from "@mui/icons-material/ChildCare";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import BedIcon from '@mui/icons-material/Bed';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';

import { Typography, Paper, Stack, Box, Button} from '@mui/material'

export default function CardAttente ({data, handleDelete, handleValidation}: any){

    const {nb_children, nb_adult, nb_bedroom, name, name_cal, start, end, status, homes, user, id} = data

    return (
        <Paper elevation={0} sx={{ my: 1, p: 1.5, border: 2, borderRadius: 3, borderColor: "#7C9D96", transition: "all 0.2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 3,},
        }}>
            <Stack direction="row" sx={{display: "flex", justifyContent: "space-between", }}>
                <Typography variant='Card'>{name}</Typography>
                <Typography variant='Card'>{start.slice(5,10)} ➜ {end.slice(5,10)}</Typography>
                <Typography variant='Card'>{name_cal}</Typography>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} sx={{ mt: 0.5,  display: "flex",alignItems: "center",justifyContent: {xs: "center",sm: "flex-start",},justifyContent: "space-between"}}>
                <Stack direction="row" spacing={{xs: 0.8, sm: 2}} sx={{display: "flex", my:{xs: 1, sm: 0}}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5,}}>
                        <PersonIcon sx={{ fontSize:{xs: 12, sm: 20} }} />
                        <Typography variant='Card'>{nb_adult}</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                    >
                        <ChildCareIcon sx={{ fontSize:{xs: 12, sm: 20} }} />
                        <Typography variant='Card'>
                            {nb_children}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                    >
                        <BedIcon sx={{ fontSize:{xs: 12, sm: 20} }} />
                        <Typography variant='Card'>
                            {nb_bedroom}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                    >
                        <HomeFilledIcon sx={{ fontSize:{xs: 12, sm: 20} }} />
                        <Typography variant='Card'>
                            {homes}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5,}}
                    >
                        <GroupIcon sx={{ fontSize:{xs: 12, sm: 20} }} />
                        <Typography variant='Card'>
                            {user}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2}     sx={{display: "flex",alignItems: "center",justifyContent: {xs: "center",sm: "flex-start",}, mt: {xs: 1,sm: 0,},}}>
                    <Button type="button" variant="delete" onClick={() => handleDelete(id)}><DeleteIcon/></Button>
                    <Button type="button" variant="valid"  onClick={() => handleValidation(id)}><CheckCircleIcon/></Button>
                </Stack>
            </Stack>
        </Paper>
    );
}