async function submitFunction(e){
    e.preventDefault();
    const inputUser=document.getElementById("inputUserName");

    console.log(inputUser.value)
    const response = await fetch("/addUser",{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username:inputUser.value})
    })
    const r = await response.json()
    console.log(r);
    localStorage.setItem("authToken",r.accessToken)
    localStorage.setItem("refToken",r.refreshToken)
    window.location="/"

}