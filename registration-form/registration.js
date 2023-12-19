function Submit() {
  const userName = document.getElementById("nameInput").value;
  const userPassword = document.getElementById("passwordInput").value;
  const userEmail = document.getElementById("emailInput").value;
  const data = {
    userName: userName,
    password: userPassword,
    email: userEmail,
  };

  fetch(`https://localhost:7171/api/Auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.open("./../", "_self");
      }
    })
    .catch((error) => console.error(error));
}
