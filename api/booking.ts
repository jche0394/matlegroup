import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, phone, preferredTimes, notes, source } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    preferredTimes?: string;
    notes?: string;
    source?: string;
  };

  if (!name || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const lines: string[] = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    "",
    source ? `Submitted from: ${source}` : "",
    "",
  ].filter((line) => line !== "");

  if (typeof preferredTimes === "string" && preferredTimes.trim() !== "") {
    lines.push("Preferred days / times:", preferredTimes.trim(), "");
  }
  if (typeof notes === "string" && notes.trim() !== "") {
    lines.push("Notes:", notes.trim());
  }

  try {
    await resend.emails.send({
      from: "Mantle Enquiries <hello@mantlegroup.com.au>",
      to: "mantlegroupau@gmail.com",
      subject: `Consultation request — ${name}`,
      replyTo: email,
      text: lines.join("\n"),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error sending booking email", error);
    res.status(500).json({ error: "Failed to send booking request" });
  }
}
