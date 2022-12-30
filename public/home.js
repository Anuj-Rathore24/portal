window.onload=async  function(){
    let token = localStorage.getItem("authToken")
    if(!token) window.location="/login"
    console.log("working till here")
    const response = await fetch("/getUser",{
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+token
        }
    })
    console.log(await response.json())
}