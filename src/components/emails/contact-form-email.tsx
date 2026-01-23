import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
  category: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
  category,
}) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>
      You have received a new message from your portfolio contact form.
    </p>
    <hr />
    <h2>Message Details:</h2>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Category:</strong> {category}</li>
    </ul>
    <h3>Message:</h3>
    <p>{message}</p>
    <hr />
    <p>This email was sent from your portfolio website.</p>
  </div>
);
