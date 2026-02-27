import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import QRScannerComponent from "@/components/features/scanner/QRScanner";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Scanner" });
  return { title: t("title") };
}

export default async function ScannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Scanner" });
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

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-gray-900">{t("adminOnly")}</h1>
        <p className="text-gray-500 mt-2">{t("adminOnlyText")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
      <p className="text-gray-600">{t("scanPrompt")}</p>
      <QRScannerComponent />
    </div>
  );
}
