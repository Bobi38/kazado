import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checko from "../tool/function.usefull"

export default function TestReco({children}) {

    const navigate = useNavigate()

    useEffect(() => {
        const co = async () => {
            const ret = await checko()
                if ( ret.success)
                    navigate('/')
            }
        co()
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}