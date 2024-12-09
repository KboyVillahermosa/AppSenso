import * as admin from 'firebase-admin';
import { auth } from 'firebase-functions/v1';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure nodemailer transporter with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'villahermosafranciso6@gmail.com', // Replace with your email
    pass: 'tooo zqju ibdr kzde', // Use App Password if using Gmail
  },
});

// Function to send a welcome email when a new user is created
export const sendWelcomeEmail = auth.user().onCreate((user: admin.auth.UserRecord) => {
  // Mail options
  const mailOptions = {
    from: 'villahermosafranciso6@gmail.com', // Sender's email
    to: user.email,               // Receiver's email (user's email)
    subject: 'Welcome to UA Worldwide!', // Email subject
    text: `Welcome to UA Worldwide!

You've activated your customer account. Next time you shop with us, log in for faster checkout.

Thank you for joining us!
- UA Worldwide Team`, // Email body
  };

  // Send the email using the nodemailer transporter
  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Welcome email sent to:', user.email);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
});
