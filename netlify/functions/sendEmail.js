exports.handler = async (event) => {
    try {
        // Dynamically import node-fetch
        const fetch = (await import('node-fetch')).default;

        // Allow only POST requests
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
            };
        }

        const data = JSON.parse(event.body);
        const { name, email, subject, message } = data;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'All fields are required.' }),
            };
        }

        console.log("User ID:", process.env.EMAILJS_USER_ID);
        console.log("accessToken:", process.env.EMAILJS_ACCESS_TOKEN);
        console.log("Template Params:", { name, email, subject, message });

        // Define EmailJS API URL
        const emailJsApiUrl = `https://api.emailjs.com/api/v1.0/email/send`;

        // Send email using fetch
        const emailJsResponse = await fetch(emailJsApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'service_xm6a5er',
                template_id: 'template_zyy5mrf',
                user_id: process.env.EMAILJS_USER_ID,
                accessToken: process.env.EMAILJS_ACCESS_TOKEN,
                template_params: { 
                    name,
                    email,
                    subject,
                    message
                }  
            })
        });

        // Check for errors in EmailJS response
        if (!emailJsResponse.ok) {
            const errorText = await emailJsResponse.text();
            console.error("EmailJS Error:", errorText);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: 'Failed to send email.', error: errorText })
            };
        }

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email Sent Successfully!' }),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'An error occurred while processing your request.',
                error: error.message
            }),
        };
    }
};
