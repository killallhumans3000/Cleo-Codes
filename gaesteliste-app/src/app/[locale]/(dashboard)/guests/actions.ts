"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { GuestFormData } from "@/types";

export async function addGuest(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const guestData: GuestFormData = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || undefined,
    visit_date: formData.get("visit_date") as string,
    notes: (formData.get("notes") as string) || undefined,
  };

  const { error } = await supabase.from("guests").insert({
    ...guestData,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function deleteGuest(guestId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId);

  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function updateGuestStatus(
  guestId: string,
  status: "pending" | "checked_in" | "checked_out"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const updateData: Record<string, string | null> = { status };
  if (status === "checked_in") {
    updateData.check_in_time = new Date().toISOString();
  } else if (status === "checked_out") {
    updateData.check_out_time = new Date().toISOString();
  }

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId);

  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function sendGuestInvite(guestId: string) {
  const supabase = await createClient();

  const { data: guest, error } = await supabase
    .from("guests")
    .select("name, email, qr_token")
    .eq("id", guestId)
    .single();

  if (error || !guest?.email) throw new Error("Guest not found or no email");

  // Dynamic import to avoid bundling server-only modules on client
  const { sendGuestInviteEmail } = await import("@/lib/email");
  await sendGuestInviteEmail(guest.email, guest.name, guest.qr_token);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}
