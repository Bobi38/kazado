import { BrowserRouter, Routes, Route} from    "react-router-dom";
import Navigation from "./Navigation/Navigation.tsx";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import CalendarPage from "./pages/calendar/CalendarPage/CalendarPage";

export default function App() {

  return (
	<>
	            <p id={'alert-container'}></p>
	<BrowserRouter>   
		<Routes> 
  			<Route path={`/`}				element={<Navigation><Home /></Navigation>}/>
			<Route path={`/login`}			element={<Login/>} />
			<Route path={`/register`}		element={<Register/>} />
			<Route path={`/calendar/:id/:name`}	element={<Navigation><CalendarPage/></Navigation>} />
		</Routes> 
	</BrowserRouter>
	</>
	)
}
