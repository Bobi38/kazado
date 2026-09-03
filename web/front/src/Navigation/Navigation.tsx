import { BottomNavigation, BottomNavigationAction, Paper, Badge, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import checko from "../tool/function.usefull"
import "./Navigation.scss";

export default function Navigation({children}) {

  const navigate = useNavigate()
  const {pathname} = useLocation();




	useEffect(() => {
		const co = async () => {
      const ret = await checko()
      if ( !ret.success)
        navigate('/login')
    }
    co()
	}, [])

  return (
    <Container sx={{pb:"70px"}}>
      <Box>
        {children}
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={3}
      >
        <BottomNavigation
          value={pathname}
          onChange={(e, newValue) => navigate(newValue)}
          showLabels
        >
          <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
          <BottomNavigationAction label="Réservations" value="/reservation" icon={<EventIcon />} />
          <BottomNavigationAction label="Invitations" value="/invitation" icon={<MailIcon />} />
          <BottomNavigationAction label="Profil" value="/profil" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}