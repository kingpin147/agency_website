import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companySize?: string;
  help?: string;
  info?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  lastName,
  email,
  companyName,
  companySize,
  help,
  info,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5", color: "#333" }}>
    <h1>Contact Form Submission</h1>
    <p><strong>First Name:</strong> {firstName}</p>
    <p><strong>Last Name:</strong> {lastName}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Company Name:</strong> {companyName}</p>
    {companySize && <p><strong>Company Size:</strong> {companySize}</p>}
    {help && <p><strong>Help:</strong> {help}</p>}
    {info && <p><strong>Additional Info:</strong> {info}</p>}
  </div>
);
