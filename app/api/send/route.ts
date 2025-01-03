import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [process.env.RECEIVER_EMAIL!], // Replace with your recipient email
      subject: "Contact Form Submission",
      react: EmailTemplate({
        firstName: first_name,
        lastName: last_name,
        email,
        companyName: company_name,
        companySize: company_size,
        help,
        info,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
