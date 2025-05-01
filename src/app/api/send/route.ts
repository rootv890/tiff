import WelcomeEmailTemplate from "@/email/Welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const emails = ["prootv.31@gmail.com", "rootv.31.sm@gmail.com"];
    const emailPromises = [...new Set(emails)].map(
      (recepientEmail) => {
        return resend.emails.send({
          from: "no-reply@prootv.pro",
          to: recepientEmail,
          replyTo: "support@prootv.pro",
          subject: "Welcome to Tiff",
          react: WelcomeEmailTemplate({
            name: "T14X",
          }),
        });
      },
    );
    const data = await Promise.all(emailPromises);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, {
      status: 500,
    });
  }
}
