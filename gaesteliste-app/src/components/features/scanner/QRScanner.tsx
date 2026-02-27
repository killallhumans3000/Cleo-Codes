"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { Guest } from "@/types";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  { ssr: false, loading: () => <ScannerPlaceholder /> }
);

type ScanResult = {
  guest: Guest;
  action: "checked_in" | "checked_out";
} | null;

export default function QRScannerComponent() {
  const t = useTranslations("Scanner");
  const [result, setResult] = useState<ScanResult>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = useCallback(
    async (scanResult: Array<{ rawValue: string }>) => {
      const rawValue = scanResult[0]?.rawValue;
      if (!rawValue || isProcessing) return;

      setIsProcessing(true);
      setError(null);

      try {
        // Extract token from URL or use raw value
        const token = rawValue.includes("/verify/")
          ? rawValue.split("/verify/").pop()!
          : rawValue;

        const response = await fetch(`/api/guests/check-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? "Unknown error");
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("guestNotFound"));
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, t]
  );

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  if (result) {
    return (
      <div className="max-w-sm mx-auto text-center space-y-4">
        <div className="text-6xl">
          {result.action === "checked_in" ? "✅" : "🚪"}
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {result.action === "checked_in" ? t("checkedIn") : t("checkedOut")}
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-gray-900">{result.guest.name}</p>
          {result.guest.email && (
            <p className="text-sm text-gray-500">{result.guest.email}</p>
          )}
          <p className="text-sm text-gray-600 mt-1">
            {new Date(result.guest.visit_date).toLocaleDateString("de-DE")}
          </p>
        </div>
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {t("scanAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="max-w-sm sm:max-w-md mx-auto">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline"
            >
              {t("scanAnother")}
            </button>
          </div>
        )}

        <div className="relative rounded-xl overflow-hidden bg-black aspect-square">
          <Scanner
            onScan={handleScan}
            onError={(err) =>
              setError(
                err instanceof Error ? err.message : t("cameraPermission")
              )
            }
            constraints={{ facingMode: "environment" }}
            components={{ finder: true, torch: true }}
            styles={{
              container: { width: "100%", height: "100%" },
            }}
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white font-medium">{t("scanning")}</div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-3">
          🔒 {t("httpsRequired")}
        </p>
      </div>
    </div>
  );
}

function ScannerPlaceholder() {
  return (
    <div className="max-w-sm mx-auto aspect-square bg-gray-900 rounded-xl flex items-center justify-center">
      <p className="text-gray-400 text-sm">Kamera lädt...</p>
    </div>
  );
}
