"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDisplay({
  token,
  appUrl,
}: {
  token: string;
  appUrl: string;
}) {
  return (
    <QRCodeSVG
      value={`${appUrl}/verify/${token}`}
      size={200}
      level="M"
    />
  );
}
