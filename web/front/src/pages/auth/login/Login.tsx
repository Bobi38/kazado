import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import { VscEye, VscEyeClosed }     from    "react-icons/vsc";
import { showAlert } from "../../../tool/function.usefull";
import socketStore from "../../../Composant/context/socketContext";
import {Button} from "@mui/material"
import "./Login.scss"


export default function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const send = socketStore((state) => state.send);

    const testSocket = () => {
        console.log("testSocket")
        send("TEST", { payload: "Hello from Login", test: "attention la team" });
    };

    const login_submit = async (e: any) =>{
        try{
            e.preventDefault()
            const form = e.target;
            const data = {
                email: form.email.value,
                password: form.password.value,
            }

            if (!data.email || !data.password )
                return ;

            const url = `/api/user/login`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            if (!ret.success){
                console.log(`front register success false: ${ret.message}`)
                showAlert(`front register success false: ${ret.message}`, "danger")
            }

            if (ret.success)
                navigate("/")
            else 
                console.log(`front register success false: ${ret.message}`)
        }catch(err){
            console.log(`Register error TRY ${err}`)
        }

    }

    return (
        <div className="log">

            <h1>Login</h1>
            <div className="auth_form">
                <form onSubmit={(e) => {login_submit(e)}}>
                    <label htmlFor="email">Email</label>
                    <input  type="email"
                            id= "email"
                            name="email"
                            placeholder="exemple@test.com"
                            required
                    />
                    <label html="password">Password</label>
                    <input  type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                    />
                    <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </span>
                    <button type="submit">Connect</button>
                </form>
            <button type="onClick" onClick={() => navigate("/register")}>Register</button>
            <Button type="button" variant="contained" color="primary" onClick={() => testSocket()}>
                socket
            </Button>
            </div>
        </div>
    )
}