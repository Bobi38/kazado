export default async function checkCo(){
    try{
        const response = await fetch('/api/secu/checkco', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });

        const rep = await response.json();
        return rep;
    }
    catch(err){
        return false;
    }
}