import {Card, CardContent, Typography, Chip, Grid, Paper, Stack, Tabs, Tab, Button} from '@mui/material'

export default function CardAttente ({data, setResaId, setAction}: any){

    const {name, name_cal, homes, start, end, status} = data

    return (
        <Card sx={{mb:1.5, borderRadius: 3}}>
            <CardContent direction="row" sx={{p:2}}>
                <Typography> {name} - {name_cal}</Typography>
                <Typography> {start.slice(0, 10)} → {end.slice(0, 10)}</Typography>
                <Typography>{homes}</Typography>
            </CardContent>
        </Card>
    )

}