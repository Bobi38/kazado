import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import checko from "../tool/function.usefull"
import "./Navigation.scss";

export default function Navigation({ children }) {

  const navigate = useNavigate()
  const location = useLocation();


	useEffect(() => {
		const co = async () => {
      const ret = await checko()
      if ( !ret.success)
        navigate('/login')
    }
    co()
	}, [])

  const isHome = location.pathname === "/";

  return (
    <div>
      <div>
          <button>🔔</button>
          <button onClick={() => navigate("/reservation")}>📅 Réservations</button>
          {!isHome && (<button onClick={() => navigate("/")}>🏠 Home</button>)}
          
      </div>
			<div className={`children-container`}>
				{children}
			</div>
    </div>
  );
}