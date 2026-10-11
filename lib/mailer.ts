import nodemailer from "nodemailer";

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const username = process.env.GMAIL_USER;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!username || !password) {
    console.warn("Gmail credentials are not configured; skipping contact email send.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${username}>`,
    to: username,
    replyTo: email,
    subject: `Portfolio inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0a0a0a;">
        <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string) {
  const username = process.env.GMAIL_USER;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!username || !password) {
    throw new Error("Gmail credentials are not configured.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: username, pass: password },
  });

  await transporter.sendMail({
    from: `"Zayn Raihan" <${username}>`,
    to: email,
    subject: "You're on the list",
    text: "Thanks for subscribing. Expect useful notes on brand, content, and growth—no fluff.",
    html: "<p>Thanks for subscribing.</p><p>Expect useful notes on brand, content, and growth—no fluff.</p>",
  });
}
