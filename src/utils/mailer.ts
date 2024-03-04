import { createTransport, Transporter } from 'nodemailer';

const SMTP_EMAIL = process.env.SMTP_EMAIL || '';
const SMTP_EMAIL_SECRET = process.env.SMTP_EMAIL_SECRET || '';

let transporter: Transporter | undefined;

if (SMTP_EMAIL == '' || SMTP_EMAIL_SECRET == '') {
    console.log('SMTP variables are missing!')
}
else {   
    transporter = createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_EMAIL_SECRET
        }
    });
}
    async function sendEmail(email: string, subject: string, mailBody: string) {
        if (!transporter) {
            console.error('SMTP email variable in .env file is incomplete. Unable to send verification emails. Check and update the .env file with accurate information.')
            return;
        }
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject,
            html: mailBody
        }
        try {
            await transporter.sendMail(mailOptions);
            console.log('email sent successfully!');
            
        } catch (error) {
            console.error('error sending mail', error);
        }
    }

export default sendEmail;