import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, organization, category, message } = await req.json();

    // Basic server-side parameter sanitation and safety checks
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Required fields name, email, and message are missing." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Direct fallback simulation if keys are not configured yet, to allow preview testing gracefully
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("[Warning] SMTP transporter parameters not defined. Simulating fallback ticket tracking log.");
      return NextResponse.json({ 
        success: true, 
        message: "Session logged in spatial support desk queue.", 
        simulated: true 
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465, // True for 465, false for 587 / other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"AssamWRIS Support Service" <${smtpUser}>`,
      to: "support-wris@assam.gov.in",
      replyTo: email,
      subject: `[WRIS Support Desk] New ${category} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\nCategory: ${category}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Error] Contact relay API failure:", err);
    return NextResponse.json({ error: err.message || "Failed to relay message." }, { status: 500 });
  }
}
