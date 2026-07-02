import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";

export default function Invitation (){

    const [pendingInvitations, setPendingInvitations] = useState([]);
    const [sentInvitations, setSentInvitations] = useState([]);

        const get_my_invitation = async () => {
        try{
            const url =`/api/invitation/send`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                console.log(ret)
                if (ret.success)
                    setPendingInvitations(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const handleAccept = async (invitationId: string, calendarId: string) => {
        try {
            const url = `/api/invitation/${encodeURIComponent(invitationId)}`

            const rep = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({calendar: calendarId })
            })

            const ret = await rep.json()
            console.log(ret)
            if (ret.success)
                get_my_invitation();
            else
                console.log(`front cal_submit success false: ${ret.message}`)
        } catch (err) {
            console.log(`cal_submit error TRY ${err}`)
        }
    }

    useEffect(() => {
        get_my_invitation();
    }, []);

    return (
        <div>
            <h1>Mes invitations</h1>
                <h2>En attentes</h2>
                <div>
                    {pendingInvitations.map(invitation => (
                        <div key={invitation.id}>
                            <strong>{invitation.name_user}</strong>
                            <button type="button" onClick={() => handleAccept(invitation.id, invitation.calendarId)}>Accepter</button>
                            <button type="button" onClick={() => handleDecline(invitation.id)}>Refuser</button>
                        </div>
                    ))}
                </div>
                <h2>Envoyées</h2>
                <div>
                    {/* {sentInvitations.map(invitation => (
                        // <InfoInvit key={invitation.id} data={invitation} />
                    ))} */}
                </div>
        </div>

    )
}