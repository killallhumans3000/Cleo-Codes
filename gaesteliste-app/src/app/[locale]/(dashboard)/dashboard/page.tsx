import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { GuestStatus } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  return { title: t("title") };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user!.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // Stats query
  const query = supabase.from("guests").select("status, visit_date");
  const { data: guests } = await query;

  const today = new Date().toISOString().split("T")[0];
  const stats = {
    total: guests?.length ?? 0,
    pending: guests?.filter((g) => g.status === "pending").length ?? 0,
    checkedIn: guests?.filter((g) => g.status === "checked_in").length ?? 0,
    checkedOut: guests?.filter((g) => g.status === "checked_out").length ?? 0,
    today: guests?.filter((g) => g.visit_date === today).length ?? 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
          {t("welcome")}, {profile?.full_name ?? user?.email}! 👋
        </h1>
        <p className="text-gray-500 mt-1">{t("title")}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label={t("totalGuests")} value={stats.total} color="blue" />
        <StatCard label={t("todayGuests")} value={stats.today} color="purple" />
        <StatCard label={t("checkedInGuests")} value={stats.checkedIn} color="green" />
        <StatCard label={t("pendingGuests")} value={stats.pending} color="yellow" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("quickActions")}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/guests"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ➕ {t("addGuest")}
          </Link>
          {isAdmin && (
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              📷 {t("openScanner")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "green" | "yellow" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${colorClasses[color]}`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 font-medium">{label}</div>
    </div>
  );
}
