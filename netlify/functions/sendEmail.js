// js/sendEmail.js
const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, error: 'All fields are required.' }),
        };
    }

    emailjs.init(process.env.EMAILJS_USER_ID);  // Initialize with the secret ID

    try {
        const response = await emailjs.send(
            YOUR_SERVICE_ID, 
            YOUR_TEMPLATE_ID, 
            { name, email, subject, message }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email Sent Successfully!' }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'An error occurred while sending the email.' })
        };
    }
};

