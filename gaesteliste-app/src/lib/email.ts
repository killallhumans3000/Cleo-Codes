import { Resend } from "resend";
import QRCode from "qrcode";
import { TicketEmail } from "../../emails/TicketEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";
const FROM_EMAIL =
  process.env.EMAIL_FROM ?? "Gästeliste <noreply@example.com>";

export async function sendGuestInviteEmail(
  guestEmail: string,
  guestName: string,
  qrToken: string,
  locale: "de" | "en" = "de"
) {
  const qrBuffer = await QRCode.toBuffer(
    `${APP_URL}/verify/${qrToken}`,
    { type: "png", width: 300, errorCorrectionLevel: "M" }
  );

  const subject =
    locale === "de" ? "Deine Einladung ins Wohnheim" : "Your dormitory invitation";

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [guestEmail],
    subject,
    react: TicketEmail({ guestName, qrToken, appUrl: APP_URL, locale }),
    attachments: [
      {
        filename: "qr-code.png",
        content: qrBuffer.toString("base64"),
        contentId: "qr-code",
      },
    ],
  });

  if (error) {
    throw new Error(`Email send failed: ${JSON.stringify(error)}`);
  }

  return data;
}
