exports.handler = async (event) => {
    try {
        console.log("Received event:", event);
        const data = JSON.parse(event.body);
        console.log("Parsed data:", data);

        const { name, email, subject, message } = data;
        console.log("Data fields:", { name, email, subject, message });

        // Check required fields
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'All fields are required.' }),
            };
        }

        // Sending email
        const response = await emailjs.send(
            'service_3gz288f', 
            'template_zyy5mrf', 
            { name, email, subject, message },
            'VfpfcnjVilQZDTv0N'
        );

        console.log("Email sent successfully:", response);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email Sent Successfully!' }),
        };

    } catch (error) {
        console.error("Function error:", error);
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
