import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import { VscEye, VscEyeClosed }     from    "react-icons/vsc";
import { showAlert } from "../../../tool/function.usefull";
import "./Register.scss"


export default function Register(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const register_submit = async (e: any) =>{
        try{
            e.preventDefault()
            const form = e.target;
            const data = {
                email: form.email.value,
                password: form.password.value,
                username: form.username.value
            }

            if (!data.email || !data.password || !data.username)
                return ;

            const url = `/api/user/register`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            if (ret.success)
                navigate("/login")
            else return showAlert(`${ret.message}`, "danger")
        }catch(err){
            console.log(`Register error TRY ${err}`)
        }

    }

    return (
        <div className="reg">
            <h1>REGISTER</h1>
            <div className="auth_form">
                <form onSubmit={(e) => {register_submit(e)}}>
                    <label  type="text">Username</label>
                    <input  type="text"
                            id="username"
                            name="username"
                            placeholder="Lola la buche"
                            required
                    />
                    <label  htmlFor="email">Email</label>
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
                    <button type="submit">Valider</button>
                </form>
            <button type="onClick" onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    )
}