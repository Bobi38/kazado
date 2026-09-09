import { Checkbox, Box, Paper, List, ListItem, ListitemText, Dialog, DialogTitle, Typography, Button} from '@mui/material'
import {useState }  from    "react";
import DoneIcon from '@mui/icons-material/Done';

export default function PopupTodo({task, open, setOpen}: any) {

    const [localTasks, setLocalTasks] = useState(task);

    console.log("IN POP")

    // const handleChange

    const handleValidate = async () => {

    }

    return (
        <>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>List To Do</DialogTitle>
                <List sx={{ my: 1, mx:2}}>
                    {task.map((t: any, index: number) =>
                        <ListItem disablePadding key={index}>
                            <Checkbox checked={t.status}disabled/>
                            <Typography>{t.task}</Typography>
                        </ListItem>
                    )}
                    <Button variant="valid" onClick={() => handleValidate()}><DoneIcon/></Button>
                </List>

            </Dialog>
        </>
    )
}