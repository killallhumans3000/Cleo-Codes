import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@/i18n/navigation";
import type { Guest } from "@/types";
import GuestDetailActions from "@/components/features/guests/GuestDetailActions";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";

export default async function GuestDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Guests" });
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !guest) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const isOwner = guest.user_id === user.id;

  if (!isAdmin && !isOwner) notFound();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    checked_in: "bg-green-100 text-green-800",
    checked_out: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    pending: t("statusPending"),
    checked_in: t("statusCheckedIn"),
    checked_out: t("statusCheckedOut"),
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/guests"
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← {t("title")}
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{guest.name}</h1>
            {guest.email && (
              <p className="text-gray-500 mt-1">{guest.email}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[guest.status as keyof typeof statusColors]
            }`}
          >
            {statusLabels[guest.status as keyof typeof statusLabels]}
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">{t("visitDate")}</dt>
            <dd className="mt-1 text-gray-900">
              {new Date(guest.visit_date).toLocaleDateString(locale)}
            </dd>
          </div>
          {guest.check_in_time && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t("checkIn")}</dt>
              <dd className="mt-1 text-gray-900">
                {new Date(guest.check_in_time).toLocaleTimeString(locale)}
              </dd>
            </div>
          )}
          {guest.check_out_time && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t("checkOut")}</dt>
              <dd className="mt-1 text-gray-900">
                {new Date(guest.check_out_time).toLocaleTimeString(locale)}
              </dd>
            </div>
          )}
          {guest.notes && (
            <div className="col-span-2">
              <dt className="text-sm font-medium text-gray-500">{t("notes")}</dt>
              <dd className="mt-1 text-gray-900">{guest.notes}</dd>
            </div>
          )}
        </dl>

        {/* QR Code */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">{t("qrCode")}</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-xl">
              <QRCodeDisplay
                token={guest.qr_token}
                appUrl={APP_URL}
              />
            </div>
            {/* Token plain text only for admins — ordinary guests don't need it */}
            {isAdmin && (
              <p className="text-xs text-gray-400 font-mono select-all">{guest.qr_token}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <GuestDetailActions
          guest={guest as Guest}
          isAdmin={isAdmin}
          isOwner={isOwner}
          locale={locale}
        />
      </div>
    </div>
  );
}

// Client component for QR rendering
import dynamic from "next/dynamic";

const QRCodeDisplay = dynamic(
  () =>
    Promise.resolve(function QRCodeDisplay({
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
    }),
  { ssr: false }
);
