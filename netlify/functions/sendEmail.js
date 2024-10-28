const emailjs = require('emailjs-com');

exports.handler = async (event) => {
    try {
        // Parse the incoming request body to JSON
        const data = JSON.parse(event.body);

        // Destructure the required fields from the parsed data
        const { name, email, subject, message } = data;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'All fields are required.' }),
            };
        }

        // Initialize emailjs with environment variable (if needed)
        // emailjs.init(process.env.EMAILJS_USER_ID);

        // Attempt to send the email using emailjs
        const response = await emailjs.send(
            'service_3gz288f', 
            'template_zyy5mrf', 
            { name, email, subject, message },
            'VfpfcnjVilQZDTv0N' // Public API Key
        );

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email Sent Successfully!' }),
        };

    } catch (error) {
        console.error("Error:", error);
        // Handle JSON parse error or email sending failure
        return {
            statusCode: error instanceof SyntaxError ? 400 : 500,
            body: JSON.stringify({
                success: false,
                message: 'An error occurred while processing your request.',
                error: error.message
            }),
        };
    }
};
