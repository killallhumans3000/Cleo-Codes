"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Guest, GuestStatus } from "@/types";

interface GuestListProps {
  guests: Guest[];
  isAdmin: boolean;
  currentUserId: string;
}

const statusColors: Record<GuestStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  checked_in: "bg-green-100 text-green-800",
  checked_out: "bg-gray-100 text-gray-800",
};

export default function GuestList({
  guests,
  isAdmin,
  currentUserId,
}: GuestListProps) {
  const t = useTranslations("Guests");

  if (guests.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-5xl mb-4">👥</div>
        <p className="font-medium">{t("noGuests")}</p>
        <p className="text-sm mt-1">{t("noGuestsText")}</p>
      </div>
    );
  }

  const statusLabel: Record<GuestStatus, string> = {
    pending: t("statusPending"),
    checked_in: t("statusCheckedIn"),
    checked_out: t("statusCheckedOut"),
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table header */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div>{t("name")}</div>
        <div>{t("visitDate")}</div>
        <div>{t("status")}</div>
        {isAdmin && <div>{t("roomNumber")}</div>}
        <div className="text-right">{t("actions")}</div>
      </div>

      {/* Guest rows */}
      <ul className="divide-y divide-gray-100">
        {guests.map((guest) => (
          <li
            key={guest.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 md:items-center gap-y-2 md:gap-y-0">
              <div>
                <p className="font-medium text-gray-900">{guest.name}</p>
                {guest.email && (
                  <p className="text-xs text-gray-500 truncate">{guest.email}</p>
                )}
              </div>

              <div className="text-sm text-gray-600">
                {new Date(guest.visit_date).toLocaleDateString("de-DE")}
              </div>

              <div>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[guest.status as GuestStatus]
                  }`}
                >
                  {statusLabel[guest.status as GuestStatus]}
                </span>
              </div>

              {isAdmin && (
                <div className="text-sm text-gray-500">
                  {guest.profiles?.room_number ?? "—"}
                </div>
              )}

              <div className="md:text-right">
                <Link
                  href={`/guests/${guest.id}`}
                  className="inline-flex items-center min-h-[44px] text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Details →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
