async function validateForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("body").value;

    if (name === "" || email === "" || message === "") {
        alert("All fields must be filled out!");
        return false;
    }
    else
        alert("Currently This project is hosted on GitHub, so the integration with EmailJS isn't possible. As all private, session key's & other credentials will be public. Instead Email me or drop a message via attached social links. Thanks!");
        return true;
}