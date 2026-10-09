import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOptMail = async (to,otp)=>{
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Reset Your Password",
        html:`<p> Your OPT for Password reset is <b> ${otp} </b> . It expires in 5 minutes.`
    })
}
export const sendDeliveryOptMail = async (user,otp)=>{
    await transporter.sendMail({
        from: process.env.EMAIL,
        to:user.email,
        subject: "Delivery Opt",
        html:`<p> Your OPT for Delivery  is <b> ${otp} </b> . It expires in 5 minutes.`
    })
}