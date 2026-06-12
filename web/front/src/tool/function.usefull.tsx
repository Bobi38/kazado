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

export function showAlert(message : string, type = "danger") {
    const container = document.getElementById("alert-container");
    if (!container) return

    container.className = type === "danger" ? "danger" : "success";
    container.textContent = message;

    setTimeout(() => {
        container.textContent = "";
        container.className = "";
    }, 5000);
}