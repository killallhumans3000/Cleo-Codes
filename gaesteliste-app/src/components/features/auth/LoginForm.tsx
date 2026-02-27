"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/[locale]/(auth)/login/actions";
import { Link } from "@/i18n/navigation";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error") === "credentials";

  return (
    <form className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <input type="hidden" name="locale" value={locale} />

      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {t("loginError")}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        formAction={login}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("login")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          {t("register")}
        </Link>
      </p>
    </form>
  );
}
