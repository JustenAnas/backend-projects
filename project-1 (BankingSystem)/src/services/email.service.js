const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // type: 'OAuth2',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // clientId: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECRET,
    // refreshToken: process.env.REFRESH_TOKEN,
  },
});
 
// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

 // Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kotak Mahindra Bank " <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegisterationEmail(userEmail, name) {
    const subject = "Welcome to KOTAK - Your Account is Ready";
    
    // Plain text version for email clients that don't support HTML
    const text = `Hi ${name},\n\nWelcome to KOTAK! Your registration was successful. You can now log in to manage your accounts, transfer funds, and more.\n\nSecure Banking Tip: Never share your password or OTP with anyone.\n\nBest regards,\nThe KOTAK Team`;

    // Professional HTML version
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #ed1c24; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">KOTAK</h1>
        </div>
        <div style="padding: 30px; color: #333333; line-height: 1.6;">
            <h2 style="color: #ed1c24;">Welcome to the family, ${name}!</h2>
            <p>Thank you for choosing <strong>KOTAK</strong> for your banking needs. We are excited to have you on board.</p>
            <p>Your digital banking profile has been successfully created. You can now access your dashboard to:</p>
            <ul style="list-style-type: none; padding: 0;">
                <li>✅ Check your account balance</li>
                <li>✅ Transfer funds securely</li>
                <li>✅ Pay bills and manage cards</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background-color: #ed1c24; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
            </div>
            <hr style="border: 0; border-top: 1px solid #eeeeee;">
            <p style="font-size: 12px; color: #777777;">
                <strong>Security Notice:</strong> KOTAK will never ask for your password, OTP, or PIN via email or phone. If you did not sign up for this account, please contact our support immediately.
            </p>
        </div>
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999999;">
            © 2026 KOTAK Banking Corp. All rights reserved.
        </div>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}
 

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "KOTAK Alert: Transaction Successful";

    const text = `Hi ${name},

Your transaction has been successfully completed.

Amount: ₹${amount}
Transferred To: ${toAccount}

If you did not authorize this transaction, please contact KOTAK support immediately.

— KOTAK Team`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #ed1c24; padding: 20px; text-align: center;">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/77/Kotak_Mahindra_Bank_logo.svg" 
                alt="Kotak Logo" 
                style="max-width: 150px;"
            />
        </div>

        <!-- Banner -->
        <img 
            src="https://www.kotak.com/content/dam/Kotak/herosliderbanner/desktop/811-desktop.jpg" 
            alt="Transaction Successful" 
            style="width: 100%; display: block;"
        />

        <!-- Body -->
        <div style="padding: 30px; color: #333; line-height: 1.6;">
            <h2 style="color: #ed1c24;">Transaction Successful</h2>

            <p>Hi <strong>${name}</strong>,</p>
            <p>Your fund transfer has been completed successfully. Below are the transaction details:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9;">Amount</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">₹${amount}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9;">Transferred To</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${toAccount}</td>
                </tr>
            </table>

            <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background-color: #ed1c24; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    View Transaction
                </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">

            <p style="font-size: 12px; color: #777;">
                <strong>Security Notice:</strong> Kotak will never ask for your OTP, PIN, or password via email, SMS, or calls.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            © 2026 Kotak Mahindra Bank Ltd. All rights reserved.
        </div>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}
async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = "KOTAK Alert: Transaction Failed";

    const text = `Hi ${name},

We were unable to process your transaction.

Amount: ₹${amount}
Attempted To: ${toAccount}

No amount has been debited from your account.

Please try again or contact KOTAK support if the issue persists.

— KOTAK Team`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #ed1c24; padding: 20px; text-align: center;">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/77/Kotak_Mahindra_Bank_logo.svg" 
                alt="Kotak Logo" 
                style="max-width: 150px;"
            />
        </div>

        <!-- Banner -->
        <img 
            src="https://www.kotak.com/content/dam/Kotak/herosliderbanner/desktop/811-desktop.jpg" 
            alt="Transaction Failed" 
            style="width: 100%; display: block;"
        />

        <!-- Body -->
        <div style="padding: 30px; color: #333; line-height: 1.6;">
            <h2 style="color: #ed1c24;">Transaction Failed</h2>

            <p>Hi <strong>${name}</strong>,</p>
            <p>We couldn’t complete your recent transaction. Please review the details below:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9;">Amount</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">₹${amount}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9;">Attempted To</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${toAccount}</td>
                </tr>
            </table>

            <p style="color: #555;">
                Don’t stress — <strong>no money has been debited</strong> from your account.
                You can retry the transaction or contact our support team for assistance.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background-color: #ed1c24; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Retry Transaction
                </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">

            <p style="font-size: 12px; color: #777;">
                <strong>Security Notice:</strong> Kotak will never ask for your OTP, PIN, or password via email, SMS, or calls.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            © 2026 Kotak Mahindra Bank Ltd. All rights reserved.
        </div>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
  sendRegisterationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};