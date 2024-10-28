const emailjs = require('emailjs-com');

exports.handler = async (event) => {
    // Allow only POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
        };
    }

    try {
        // Log incoming event body
        console.log("Event Body:", event.body);
        
        const data = JSON.parse(event.body); // Parse request body
        const { name, email, subject, message } = data;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            console.log("Validation failed:", { name, email, subject, message });
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'All fields are required.' }),
            };
        }

        console.log("Sending email with emailjs");
        
        // Send email with emailjs
        const response = await emailjs.send(
            'service_3gz288f', 
            'template_zyy5mrf', 
            { name, email, subject, message },
            'VfpfcnjVilQZDTv0N'
        );

        console.log("Email successfully sent:", response);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email Sent Successfully!' }),
        };

    } catch (error) {
        console.error("Error occurred:", error);
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
