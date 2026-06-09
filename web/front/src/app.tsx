import { BrowserRouter, Routes, Route} from    "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import CalendarPage from "./pages/calendar/CalendarPage/CalendarPage";

export default function App() {

  return (
	<BrowserRouter>   
		<Routes> 
  			<Route path={`/`}				element={<Home />		} />
			<Route path={`/login`}			element={<Login />		} />
			<Route path={`/register`}		element={<Register />		} />
			<Route path={`/calendar/:id`}	element={<CalendarPage />} />
		</Routes> 
	</BrowserRouter>
	)
}
