// import nodemailer from "nodemailer";

// export const sendMail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({ from: "Loan App", to, subject, html });
// };

// lib/sendMail.js (or your existing file)
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({ from: "Loan App", to, subject, html });
};

// Add this new function for password reset
export const sendPasswordResetEmail = async (email, resetUrl, userName = "User") => {
  const subject = "Password Reset Request - Loan App";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 20px;
            }
            .message {
                color: #64748b;
                margin-bottom: 30px;
                font-size: 15px;
            }
            .button-container {
                text-align: center;
                margin: 35px 0;
            }
            .reset-button {
                display: inline-block;
                padding: 16px 40px;
                background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                color: #ffffff;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }
            .alternative-link {
                margin-top: 25px;
                padding: 20px;
                background-color: #f8fafc;
                border-radius: 8px;
                border-left: 4px solid #2563eb;
            }
            .alternative-link p {
                margin: 0 0 10px 0;
                font-size: 13px;
                color: #64748b;
            }
            .alternative-link a {
                color: #2563eb;
                word-break: break-all;
                font-size: 12px;
            }
            .warning {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                border-radius: 8px;
                margin: 25px 0;
            }
            .warning p {
                margin: 0;
                color: #92400e;
                font-size: 14px;
            }
            .footer {
                background-color: #f8fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }
            .footer p {
                color: #94a3b8;
                font-size: 13px;
                margin: 5px 0;
            }
            .expiry {
                color: #64748b;
                font-size: 14px;
                font-weight: 500;
                margin-top: 20px;
                padding: 12px;
                background-color: #f1f5f9;
                border-radius: 8px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Password Reset</h1>
            </div>
            
            <div class="content">
                <p class="greeting">Hello ${userName},</p>
                
                <p class="message">
                    We received a request to reset your password for your Loan App account. 
                    Click the button below to create a new password:
                </p>
                
                <div class="button-container">
                    <a href="${resetUrl}" class="reset-button">
                        Reset My Password
                    </a>
                </div>
                
                <div class="expiry">
                    ⏰ This link will expire in <strong>1 hour</strong> for security reasons.
                </div>
                
                <div class="alternative-link">
                    <p><strong>Button not working?</strong></p>
                    <p>Copy and paste this link into your browser:</p>
                    <a href="${resetUrl}">${resetUrl}</a>
                </div>
                
                <div class="warning">
                    <p>
                        <strong>⚠️ Important:</strong> If you didn't request a password reset, 
                        please ignore this email or contact support if you have concerns. 
                        Your password will remain unchanged.
                    </p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Loan App</strong></p>
                <p>This is an automated message, please do not reply to this email.</p>
                <p style="margin-top: 15px; color: #cbd5e1; font-size: 12px;">
                    © ${new Date().getFullYear()} Loan App. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  await sendMail(email, subject, html);
};
