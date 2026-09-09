import { Checkbox, Stack, Paper, List, ListItem, ListitemText, Dialog, DialogTitle, Typography, Button} from '@mui/material'
import {useState }  from    "react";
import DoneIcon from '@mui/icons-material/Done';

export default function PopupTodo({task, open, setOpen}: any) {

    const [localTasks, setLocalTasks] = useState(task);

    console.log("IN POP")

    const handleChange = (index: number) => {
        setLocalTasks((prev: any[]) =>
            prev.map((t, i) =>
            i === index
                ? { ...t, status: !t.status }
                : t
            )
        );
    };

    const handleValidate = async () => {

    }

    return (
        <>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>List To Do</DialogTitle>
                <List sx={{ my: 1, mx:2}}>
                    {task.map((t: any, index: number) =>
                        <ListItem disablePadding key={t.id}>
                            <Checkbox checked={t.status} onChange={() => handleChange(t.id)} disabled/>
                            <Typography>{t.task}</Typography>
                        </ListItem>
                    )}
                    <Stack>
                    <Button variant="valid" onClick={() => handleValidate()}><DoneIcon/></Button>
                    </Stack>
                </List>

            </Dialog>
        </>
    )
}