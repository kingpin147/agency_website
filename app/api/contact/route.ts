import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      first_name,
      last_name,
      email,
      company_name,
      help,
      company_size,
      info,
    } = await req.json();

    // Validate input
    if (!first_name || !last_name || !email || !company_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "Contact Form Submission",
      html: `
        <h1>Contact Form</h1>
        <p>First Name: ${first_name}</p>
        <p>Last Name: ${last_name}</p>
        <p>Work Email: ${email}</p>
        <p>Company Name: ${company_name}</p>
        <p>Company Size: ${company_size}</p>
        <p>Help: ${help}</p>
        <p>Info: ${info}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send email", details: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
