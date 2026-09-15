import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            const ret = await fetch(`api/user/logout`, {
                method: 'POST',
                credentials: 'include',
            })
            const rep = await ret.json()
            if ( rep.success)
                navigate('/login')
        }
        logout()
    }, [])
}