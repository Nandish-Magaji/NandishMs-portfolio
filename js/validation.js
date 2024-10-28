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

    // Call the Netlify Function
    try {
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            alert("Email Sent Successfully!");
            return true;
        } else {
            alert("Failed to send email:"+ result.error);
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
        return false;
    }

    return true;
}

