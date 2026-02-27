/**
 * Public QR verification page — embedded in QR codes.
 * On mobile, this page shows guest info and redirects admin users to scanner.
 */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: guest } = await supabase
    .from("guests")
    .select("name, email, visit_date, status")
    .eq("qr_token", token)
    .single();

  if (!guest) notFound();

  const statusEmoji = {
    pending: "⏳",
    checked_in: "✅",
    checked_out: "🚪",
  }[guest.status as string] ?? "❓";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-5xl">{statusEmoji}</div>
        <h1 className="text-2xl font-bold text-gray-900">{guest.name}</h1>
        {guest.email && (
          <p className="text-gray-500 text-sm">{guest.email}</p>
        )}
        <p className="text-gray-700">
          {new Date(guest.visit_date).toLocaleDateString("de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div
          className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            guest.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : guest.status === "checked_in"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {guest.status === "pending" && "Ausstehend"}
          {guest.status === "checked_in" && "Eingecheckt ✓"}
          {guest.status === "checked_out" && "Ausgecheckt"}
        </div>
      </div>
    </div>
  );
}
