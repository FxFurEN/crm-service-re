const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const domain = process.env.VERCEL_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc;">
      <h2 style="color: #333;">Сброс пароля в CRM-SERVICE</h2>
      <p>Для сброса пароля нажмите на кнопку ниже:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Сбросить пароль</a>
      <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
      <p>С уважением, команда CRM-SERVICE</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Сброс пароля в CRM-SERVICE',
      html: htmlContent,
    });

  } catch (error) {
    throw error;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc;">
      <h2 style="color: #333;">Подтверждение электронной почты в CRM-SERVICE</h2>
      <p>Для подтверждения электронной почты нажмите на кнопку ниже:</p>
      <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">Подтвердить электронную почту</a>
      <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
      <p>С уважением, команда CRM-SERVICE</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Подтверждение электронной почты в CRM-SERVICE',
      html: htmlContent,
    });

  } catch (error) {
    throw error;
  }
};
