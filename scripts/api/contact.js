import nodemailer from "nodemailer";

const SALES_INBOX = "sales@ebkantech.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, service, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `Enquiry: ${service || "General"} — ${name}${
    company ? ` (${company})` : ""
  }`;
  const text = [
    `Name: ${name}`,
    `Company: ${company || "-"}`,
    `Email: ${email}`,
    `Service: ${service || "-"}`,
    "",
    message || "",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Ebkan Tech Website" <${process.env.SMTP_USER}>`,
      to: SALES_INBOX,
      replyTo: email,
      subject,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Enquiry email failed to send:", err);
    return res.status(502).json({ error: "Failed to send email." });
  }
}
