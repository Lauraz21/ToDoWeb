function SubmitLogin() {
const userName = document.getElementById("userNameInput").value;
const userPassword = document.getElementById("passwordInput").value;

    fetch(`https://localhost:7171/api/Auth?username=${userName}&password=${userPassword}`,
    {
        method: 'GET'
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            alert("The user name or password is incorrect! Please try again")
        }
        window.location.reload();
    })
    .then(result => {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", result.id);
        window.open("./../toDo-form/toDo.html",'_self');
    })
    .catch(error => console.log(error));
}

