'use server';

import nodemailer from 'nodemailer';
import { ErrorData } from '@/app/_lib/interfaces';

export async function CreateInvoiceContactForm(
  prev: { errorData: ErrorData; number: number; redirection: boolean },
  formData: FormData,
  selectedOption: string | undefined,
): Promise<{ errorData: ErrorData; number: number; redirection: boolean }> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  console.log(selectedOption);
  if (!process.env.EMAIL) return prev;
  if (!selectedOption) return prev;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  let phone = formData.get('phone') as string;
  phone = phone.replaceAll(' ', '');
  phone = phone.replaceAll('-', '');
  phone = phone.replaceAll('+', '');
  phone = phone.replaceAll('(', '');
  phone = phone.replaceAll(')', '');
  const company = formData.get('company') as string;
  let errorData = {
    email: prev.errorData.email,
    company: prev.errorData.company,
    name: prev.errorData.name,
    phone: prev.errorData.phone,
  };
  if (!name) errorData = { ...errorData, name: true };
  else errorData = { ...errorData, name: false };
  if (!email || !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) errorData = { ...errorData, email: true };
  else errorData = { ...errorData, email: false };
  if (phone && !/^\d{7,15}$/.test(phone)) errorData = { ...errorData, phone: true };
  else errorData = { ...errorData, phone: false };
  //if (!company) errorData = { ...errorData, company: true };
  //else errorData = { ...errorData, company: false };
  if (errorData.company || errorData.email || errorData.name || errorData.phone)
    return { errorData, number: prev.number + 1, redirection: false };

  const htmlContent = `Hello ${name}${company ? ' @' + company.toString() : ''}<br/><br/>Thank you for selecting ${selectedOption} as your product!<br/><br/>Thank you for contacting us. We will get back to you as soon as possible.<br/><br/> If you received this email by mistake, please ignore it.<br/><br/>Best regards,<br/><br/><a href="https://www.frontendmentor.io/profile/VillageR88">VillageR88</a><br/>`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Contact Form',
    html: htmlContent,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('there was an error: ', err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
  return { errorData, number: prev.number + 1, redirection: true };
}
