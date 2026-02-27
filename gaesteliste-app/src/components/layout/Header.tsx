"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { logout } from "@/app/[locale]/(auth)/login/actions";
import { useParams } from "next/navigation";

interface HeaderProps {
  userEmail: string | undefined;
  isAdmin: boolean;
}

export default function Header({ userEmail, isAdmin }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useParams<{ locale: string }>();

  const switchTo = currentLocale === "de" ? "en" : "de";

  const navItems = [
    { href: "/dashboard", label: t("Navigation.dashboard") },
    { href: "/guests", label: t("Navigation.guests") },
    ...(isAdmin ? [{ href: "/scanner", label: t("Navigation.scanner") }] : []),
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="font-bold text-xl text-blue-600">
            🏠 Gästeliste
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={() => router.replace(pathname, { locale: switchTo })}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded hover:bg-gray-100 min-h-[44px] flex items-center"
              aria-label={t("Common.language")}
            >
              {currentLocale === "de" ? "🇬🇧 EN" : "🇩🇪 DE"}
            </button>

            {/* User + logout */}
            <form>
              <input type="hidden" name="locale" value={locale} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:block">
                  {userEmail}
                </span>
                <button
                  formAction={logout}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  {t("Common.logout")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="md:hidden border-t border-gray-100 flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 text-center py-3 text-xs font-medium transition-colors ${
              pathname === item.href
                ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
