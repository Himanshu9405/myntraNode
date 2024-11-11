import nodemailer from "nodemailer";

export const generateOTP = () => {
  let otp = "";

  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9);
    otp += randomValue;
  }
  return otp;
};

export const generateEmailTemplate = (code) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f7f7f7;
          }  
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #555555;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Myntra</h1>
          <p>Please verify your email to continue.</p>
          <p>Your verification code is: <strong>${code}</strong></p>
        </div>
      </body>
    </html>`;
};

export const sendMail = async (name, email, subject, html) => {
  return new Promise((resolve, reject) => {
    try {      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending reset email:", error);
          reject(new Error("Failed to send email"));
        } else {
          console.log("Password reset email sent:", info.response);
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

