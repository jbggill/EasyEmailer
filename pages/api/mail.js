const { google } = require("googleapis");
const nodemailer = require("nodemailer");

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

// Create a transport using Nodemailer with OAuth2 authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "YOUR_GMAIL_ADDRESS",
    clientId: credentials.client_id,
    clientSecret: credentials.client_secret,
    refreshToken: credentials.refresh_token,
    accessToken: oauth2Client.getAccessToken(),
  },
});

// Function to send an email
async function sendEmail(subject, body, recipient) {
  try {
    const mailOptions = {
      from: "jbggill@gmail.com",
      to: recipient,
      subject: subject,
      text: body,
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Usage example
sendEmail("Hello", "This is the email body", "recipient@example.com");
