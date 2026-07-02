import { BrowserRouter, Routes, Route} from    "react-router-dom";
import { useEffect } from "react";
import socketStore from "./Composant/context/socketContext.tsx";
import Navigation from "./Navigation/Navigation.tsx";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import CalendarPage from "./pages/calendar/CalendarPage/CalendarPage";
import Reservation from "./pages/reservation/reservation.tsx"
import Invitation from "./pages/invitation/invitation.tsx";

export default function App() {
	  const connect = socketStore((state) => state.connect);

	useEffect(() => {
		connect();
	}, [connect]);

  return (
	<>
	            <p id={'alert-container'}></p>
	<BrowserRouter>   
		<Routes> 
  			<Route path={`/`}				element={<Navigation><Home/></Navigation>}/>
			<Route path={`/login`}			element={<Login/>} />
			<Route path={`/register`}		element={<Register/>} />
			<Route path={`/reservation`}	element={<Navigation><Reservation/></Navigation>}/>
			<Route path={`/invitation`}	element={<Navigation><Invitation/></Navigation>}/>
			<Route path={`/calendar/:id/:name`}	element={<Navigation><CalendarPage/></Navigation>} />
  			<Route path={`/*`}				element={<Navigation><Home /></Navigation>}/>
		</Routes> 
	</BrowserRouter>
	</>
	)
}
