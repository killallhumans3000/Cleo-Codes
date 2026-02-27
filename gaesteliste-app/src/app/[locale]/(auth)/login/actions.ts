"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const locale = (formData.get("locale") as string) || "de";

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
  const locale = (formData.get("locale") as string) || "de";

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
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
  const locale = (formData.get("locale") as string) || "de";

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${locale}/login`);
}
