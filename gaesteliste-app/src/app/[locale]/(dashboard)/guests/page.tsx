import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import GuestList from "@/components/features/guests/GuestList";
import AddGuestForm from "@/components/features/guests/AddGuestForm";
import type { Metadata } from "next";
import type { Guest } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guests" });
  return { title: t("title") };
}

export default async function GuestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guests" });
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // Admins see all guests with profile info, users see own guests
  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .order("visit_date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
      </div>

      <AddGuestForm />

      <GuestList
        guests={(guests as unknown as Guest[]) ?? []}
        isAdmin={isAdmin}
        currentUserId={user!.id}
      />
    </div>
  );
}
