const { google } = require("googleapis");

// Set up OAuth2 credentials
const credentials = {
  client_id: "YOUR_CLIENT_ID",
  client_secret: "YOUR_CLIENT_SECRET",
  redirect_uri: "YOUR_REDIRECT_URI",
  refresh_token: "YOUR_REFRESH_TOKEN",
};

// Create a new OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uri
);

// Set the refresh token for the OAuth2 client
oauth2Client.setCredentials({ refresh_token: credentials.refresh_token });

// Create a Gmail API client
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// Function to send an email
async function sendEmail(subject, body, recipient) {
  try {
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageParts = [
      `From: Your Name <YOUR_EMAIL_ADDRESS>`,
      `To: ${recipient}`,
      `Subject: ${utf8Subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      `MIME-Version: 1.0`,
      "",
      body,
    ];
    const message = messageParts.join("\n");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: Buffer.from(message).toString("base64"),
      },
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Usage example
sendEmail("Hello", "This is the email body", "recipient@example.com");
