'use server';

import nodemailer from 'nodemailer';

export async function CreateInvoiceContactForm(
  prev: { number: number; redirection: boolean },
  formData: FormData,
  sum: number,
): Promise<{ number: number; redirection: boolean }> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  //debug

  if (!process.env.EMAIL) return prev;

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const billing = formData.get('billing') as string;
  const onlineService = formData.get('onlineService') as string;
  const largerStorage = formData.get('largerStorage') as string;
  const customizableProfile = formData.get('customizableProfile') as string;
  const queryType = formData.get('queryType') as string;
  console.log('name: ', name);
  console.log('email: ', email);
  console.log('billing: ', billing);
  console.log('billing: ', billing ? 'Yearly' : 'Monthly');
  console.log('onlineService: ', onlineService);
  console.log('largerStorage: ', largerStorage);
  console.log('customizableProfile: ', customizableProfile);
  console.log('queryType: ', queryType);

  //INFO: billing gets null or on;
  return prev;
  //const phone = formData.get('phone') as string;

  //if (!company) errorData = { ...errorData, company: true };
  //else errorData = { ...errorData, company: false };

  const htmlContent = `Hello ${name}<br/><br/>Thank you for selecting ${sum.toString()} as your product!<br/><br/>Thank you for contacting us. We will get back to you as soon as possible.<br/><br/> If you received this email by mistake, please ignore it.<br/><br/>Best regards,<br/><br/><a href="https://www.frontendmentor.io/profile/VillageR88">VillageR88</a><br/>`;
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
  return { number: prev.number + 1, redirection: true };
}
