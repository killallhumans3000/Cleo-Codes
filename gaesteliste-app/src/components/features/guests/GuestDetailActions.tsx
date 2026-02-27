"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { deleteGuest, updateGuestStatus, sendGuestInvite } from "@/app/[locale]/(dashboard)/guests/actions";
import type { Guest } from "@/types";

interface GuestDetailActionsProps {
  guest: Guest;
  isAdmin: boolean;
  isOwner: boolean;
  locale: string;
}

export default function GuestDetailActions({
  guest,
  isAdmin,
  isOwner,
  locale,
}: GuestDetailActionsProps) {
  const t = useTranslations("Guests");
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(t("deleteConfirm"))) return;
    await deleteGuest(guest.id);
    router.push("/guests");
  };

  const handleCheckIn = async () => {
    await updateGuestStatus(guest.id, "checked_in");
    router.refresh();
  };

  const handleCheckOut = async () => {
    await updateGuestStatus(guest.id, "checked_out");
    router.refresh();
  };

  const handleSendInvite = async () => {
    if (!guest.email) return;
    const safeLocale = locale === "en" ? "en" : "de";
    await sendGuestInvite(guest.id, safeLocale);
    alert(t("inviteSent"));
  };

  return (
    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
      {isAdmin && guest.status === "pending" && (
        <button
          onClick={handleCheckIn}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium w-full sm:w-auto min-h-[44px]"
        >
          ✅ {t("checkIn")}
        </button>
      )}
      {isAdmin && guest.status === "checked_in" && (
        <button
          onClick={handleCheckOut}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium w-full sm:w-auto min-h-[44px]"
        >
          🚪 {t("checkOut")}
        </button>
      )}
      {guest.email && (isAdmin || isOwner) && (
        <button
          onClick={handleSendInvite}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto min-h-[44px]"
        >
          ✉️ {t("sendInvite")}
        </button>
      )}
      {(isAdmin || isOwner) && (
        <button
          onClick={handleDelete}
          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium w-full sm:w-auto min-h-[44px]"
        >
          🗑️ {t("deleteGuest")}
        </button>
      )}
    </div>
  );
}
