import {Card, CardContent, Typography, Chip, Grid, Paper, Stack, Tabs, Tab} from '@mui/material'

export default function CardAttente ({data}){

    const {name, name_cal, homes, start, end, status} = data

    return (
        <Card sx={{mb:1.5, borderRadius: 3}}>
            <CardContent sx={{p:2}}>
                <Typography> {name} - {name_cal} - {status}</Typography>
                <Typography> {start.slice(0, 10)} → {end.slice(0, 10)}</Typography>
                <Typography>{homes}</Typography>
                <Typography>{status}</Typography>
            </CardContent>
        </Card>
    )

}