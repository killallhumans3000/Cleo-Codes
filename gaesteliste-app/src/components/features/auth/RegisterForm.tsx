"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { signup } from "@/app/[locale]/(auth)/login/actions";
import { Link } from "@/i18n/navigation";

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error") === "signup";

  return (
    <form className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <input type="hidden" name="locale" value={locale} />

      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {t("registerError")}
        </div>
      )}

      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("fullName")}
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

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
          minLength={8}
          autoComplete="new-password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        formAction={signup}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("register")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("hasAccount")}{" "}
        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          {t("login")}
        </Link>
      </p>
    </form>
  );
}
