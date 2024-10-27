// js/sendEmail.js
const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
    const { name, email, subject, message } = JSON.parse(event.body);

    emailjs.init(process.env.EMAILJS_USER_ID);  // Initialize with the secret ID

    try {
        await emailjs.send(
            'YOUR_SERVICE_ID', 
            'YOUR_TEMPLATE_ID', 
            { name, email, subject, message }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "Failed to send email" })
        };
    }
};

