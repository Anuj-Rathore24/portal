window.onload = async function () {
  let token = localStorage.getItem("authToken");
  console.log(token);
  if (!token) {
    alert("Login First");
    window.location = "/login";
  }
  console.log("working till here");
  await fetch("/getUser", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then(async (r) => {
      const re = await r.json();
      if ((re.name == "TokenExpiredError")) {
        alert("Your Token has been expired");
        window.location = "/login";
      }
      document.getElementById("mainContainerHome").innerHTML=JSON.stringify(re[0].events);
    })
    .catch((err) => {
      alert(err);
    });
};
