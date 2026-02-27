import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || typeof token !== "string") {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const qrBuffer = await QRCode.toBuffer(
    `${APP_URL}/verify/${token}`,
    {
      type: "png",
      width: 300,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    }
  );

  return new NextResponse(new Uint8Array(qrBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
