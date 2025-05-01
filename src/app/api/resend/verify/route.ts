import EmailVerificationTemplate from "@/email/VerifyEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

interface Tag {
  name: string;
  value: string;
}

interface Props {
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo: string;
  subject: string;
  username?: string;
  validationCode: string;
  headers?: Record<string, string>;
  tags?: Tag[];
}

export async function POST(request: NextRequest) {
  const {
    from,
    to,
    cc,
    bcc,
    replyTo,
    subject,
    username,
    validationCode,
    headers,
    tags,
  } = await request.json() as Props;
  try {
    // validation of required  fields
    if (!from) {
      return NextResponse.json({ error: "No sender email provided" }, {
        status: 400,
      });
    }
    if (!to) {
      return NextResponse.json({ error: "No recipient email provided" }, {
        status: 400,
      });
    }
    if (!validationCode) {
      return NextResponse.json({ error: "No validation code provided" }, {
        status: 400,
      });
    }

    // convert all string to array whihc has stirng[]
    let ccArray: string[] = [];
    let bccArray: string[] = [];
    let toArray: string[] = [];

    if (cc && !Array.isArray(cc)) {
      ccArray = [cc];
    }
    if (bcc && !Array.isArray(bcc)) {
      bccArray = [bcc];
    }
    if (to && !Array.isArray(to)) {
      toArray = [to];
    }

    const emailPromises = [...new Set([...toArray, ...ccArray, ...bccArray])]
      .map(
        (recepientEmail) => {
          return resend.emails.send({
            from: from,
            to: recepientEmail,
            replyTo: replyTo,
            subject: subject,
            react: EmailVerificationTemplate({
              username: username ?? "User",
              validationCode: validationCode,
            }),
            cc: ccArray,
            bcc: bccArray,
            headers: headers,
            tags: tags,
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

// example body
/**
 * {
 *  "from": "no-reply@prootv.pro",
 *  "to": "prootv.31@gmail.com",
 *  "replyTo": "support@prootv.pro",
 *  "subject": "Verify your email",
 *  "react": "<EmailVerificationTemplate username='T14X' validationCode='123456' />"
 * }
 */
