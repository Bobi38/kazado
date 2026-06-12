import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import checko from "../tool/function.usefull"
import "./Navigation.scss";

export default function Navigation({ children }) {

  const navigate = useNavigate()

  const [hello,setHello] = useState("")

	useEffect(() => {
		const co = async () => {
      const ret = await checko()
      if ( !ret.success)
        navigate('/login')
    }
    co()
	}, [])

  return (
    <div>
      <div>
          <button>Not</button>
      </div>
			<div className={`children-container`}>
				{children}
			</div>
    </div>
  );
}