import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import checko from "../tool/function.usefull"
import "./Navigation.scss";

export default function Navigation({ children }) {

  const navigate = useNavigate()

	useEffect(() => {
		const co = async () => {
      const ret = await checko()
      if ( !ret.success)
        navigate('/login')
    }
    co()
	}, [])

  return (
			<div className={`children-container`}>
				{children}
			</div>
  );
}