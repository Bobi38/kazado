import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState, Dispatch, SetStateAction }            from    "react";
import CloseIcon from '@mui/icons-material/Close';
import {FormControlLabel, Checkbox, Paper, Box, Stack, TextField, Typography, Button, Divider} from "@mui/material"
import HomeForm from "../../../Composant/HomeForm/homeForm";
import parseForm from "../../../Composant/HomeForm/parseForm";

type ListCalProps = {
  setFormCal: Dispatch<SetStateAction<boolean>>;

};

export default function FormNewCal({setFormCal}: ListCalProps){
   const AddCal = async (data: any) => {
        try{
            const url = `/api/calendar/Calendar`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log(`in add cal = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }

    }

    const AddHome = async (data: any, id:string) => {
        try{
            const url = `/api/calendar/Home?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log(`in add home = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }    
    }

    const FORMCall_submit = async (e) => {
        e.preventDefault();
        const d = e.target
        const dataCal ={
            name: d.name_cal.value,
            validator: d.validator.checked
        }
        const dataHome = parseForm(e)
        const ret = await AddCal(dataCal)
        if(ret.success && ret.id)
            await AddHome(dataHome, ret.id)
        setFormCal(false)
    }
    return(
        <>
            <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
                <Typography variant="FormTitle">Nouveau Calendrier</Typography>
                <Button type="button" variant="close" onClick={()=> setFormCal(false)}><CloseIcon/></Button>
            </Box>
            <Box sx={{pt: 2}}>
                    <form onSubmit={FORMCall_submit}>
                        <Stack spacing={1}>
                            <TextField
                                name="name_cal"
                                placeholder="Nom de votre calendrier"
                                type="text"
                                required
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="validator"
                                    />
                                }
                                label="Souhaitez-vous une politique de validation"
                            />
                        <Typography sx={{fontSize:"17px"}}>Premiere Home</Typography>
                            <HomeForm data={null}/>
                            <button type="submit">valider</button>
                        </Stack>
                    </form>
            </Box>
        </>

    )
}