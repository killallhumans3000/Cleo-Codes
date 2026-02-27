/**
 * Public QR verification page — embedded in QR codes sent to guests.
 * Intentionally minimal: shows name, visit date, current status.
 * The email field is NOT shown to limit PII exposure to QR scanners.
 */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

const LABELS = {
  de: {
    pending: "Ausstehend",
    checked_in: "Eingecheckt ✓",
    checked_out: "Ausgecheckt",
    visit: "Besuchstag",
  },
  en: {
    pending: "Pending",
    checked_in: "Checked in ✓",
    checked_out: "Checked out",
    visit: "Visit date",
  },
} as const;

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Detect locale from Accept-Language header (falls back to German)
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") ?? "";
  const locale: "de" | "en" = acceptLanguage.toLowerCase().startsWith("en") ? "en" : "de";
  const labels = LABELS[locale];

  const supabase = await createClient();

  // Only expose the minimum fields needed for doorman verification
  const { data: guest } = await supabase
    .from("guests")
    .select("name, visit_date, status")
    .eq("qr_token", token)
    .single();

  if (!guest) notFound();

  const STATUS = {
    pending: { emoji: "⏳", color: "bg-yellow-100 text-yellow-800", label: labels.pending },
    checked_in: { emoji: "✅", color: "bg-green-100 text-green-800", label: labels.checked_in },
    checked_out: { emoji: "🚪", color: "bg-gray-100 text-gray-800", label: labels.checked_out },
  };

  const statusKey = guest.status as keyof typeof STATUS;
  const { emoji, color, label } = STATUS[statusKey] ?? {
    emoji: "❓",
    color: "bg-gray-100 text-gray-700",
    label: guest.status,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-5xl">{emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900">{guest.name}</h1>
        <p className="text-sm text-gray-500">
          {labels.visit}:{" "}
          {new Date(guest.visit_date).toLocaleDateString(locale === "en" ? "en-GB" : "de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${color}`}>
          {label}
        </div>
      </div>
    </div>
  );
}
