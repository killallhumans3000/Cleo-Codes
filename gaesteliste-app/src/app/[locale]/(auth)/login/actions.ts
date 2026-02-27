"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_LOCALES = ["de", "en"] as const;
type AllowedLocale = (typeof ALLOWED_LOCALES)[number];

function safeLocale(raw: unknown): AllowedLocale {
  if (typeof raw === "string" && (ALLOWED_LOCALES as readonly string[]).includes(raw)) {
    return raw as AllowedLocale;
  }
  return "de";
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const locale = safeLocale(formData.get("locale"));

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/${locale}/login?error=credentials`);
  }

  revalidatePath("/", "layout");
  redirect(`/${locale}/dashboard`);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const locale = safeLocale(formData.get("locale"));

  const fullName = formData.get("full_name");
  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    redirect(`/${locale}/register?error=invalid_name`);
  }

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: (fullName as string).trim(),
      },
    },
  });

  if (error) {
    redirect(`/${locale}/register?error=signup`);
  }

  revalidatePath("/", "layout");
  redirect(`/${locale}/check-email`);
}

export async function logout(formData: FormData) {
  const supabase = await createClient();
  const locale = safeLocale(formData.get("locale"));

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${locale}/login`);
}
