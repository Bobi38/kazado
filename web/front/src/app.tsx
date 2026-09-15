import { BrowserRouter, Routes, Route} from    "react-router-dom";
import { useEffect } from "react";
// import socketStore from "./Composant/context/socketContext.tsx";
import Navigation from "./Navigation/Navigation.tsx";
import TestReco from "./Navigation/TestReco.tsx";
import SendMail from "./pages/auth/passwordforget/SendMail.tsx";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Logout from "./pages/logout/logout.tsx";
import CalendarPage from "./pages/calendar/CalendarPage/CalendarPage";
import Reservation from "./pages/reservation/reservation.tsx"
import Invitation from "./pages/invitation/invitation.tsx";
import ResetPassword from "./pages/auth/passwordforget/ResetPassword.tsx";

export default function App() {
// 	const connect = socketStore((state) => state.connect);

// useEffect(() => {
//     connect();
//     return () => {
//         const { socket } = socketStore.getState();
//         socket?.disconnect();
//     };
// }, [connect]);

  return (
	<BrowserRouter>   
		<Routes> 
  			<Route path={`/`}				element={<Navigation><Home/></Navigation>}/>
			<Route path={`/logout`}			element={<Logout/>} />
			<Route path={`/resetpassword`}	element={<ResetPassword/>} />
			<Route path={`/login`}			element={<TestReco><Login/></TestReco>} />
			<Route path={`/sendmail`}		element={<TestReco><SendMail/></TestReco>} />
			<Route path={`/register`}		element={<TestReco><Register/></TestReco>} />
			<Route path={`/reservation`}	element={<Navigation><Reservation/></Navigation>}/>
			<Route path={`/invitation`}	element={<Navigation><Invitation/></Navigation>}/>
			<Route path={`/calendar/:id/:name`}	element={<Navigation><CalendarPage/></Navigation>} />
  			<Route path={`/*`}				element={<Navigation><Home /></Navigation>}/>
		</Routes> 
	</BrowserRouter>
	)
}
