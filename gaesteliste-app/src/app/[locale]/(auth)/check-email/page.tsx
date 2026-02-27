import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CheckEmailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">📬</div>
        <h1 className="text-3xl font-bold text-gray-900">{t("checkEmail")}</h1>
        <p className="text-gray-600">{t("checkEmailText")}</p>
        <Link
          href="/login"
          className="inline-block text-blue-600 hover:text-blue-800 underline"
        >
          {t("hasAccount")} {t("login")}
        </Link>
      </div>
    </div>
  );
}
