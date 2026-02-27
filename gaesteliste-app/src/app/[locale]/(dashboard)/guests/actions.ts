"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_STATUSES = ["pending", "checked_in", "checked_out"] as const;

// -------------------------------------------------------
// Input validation helpers (no extra dep required)
// -------------------------------------------------------
function validateName(name: unknown): string {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Name ist erforderlich");
  }
  if (name.trim().length > 255) throw new Error("Name ist zu lang (max. 255 Zeichen)");
  return name.trim();
}

function validateEmail(email: unknown): string | undefined {
  if (!email || typeof email !== "string" || email.trim() === "") return undefined;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) throw new Error("Ungültige E-Mail-Adresse");
  return email.trim();
}

function validateDate(date: unknown): string {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Ungültiges Datum");
  }
  return date;
}

function validateNotes(notes: unknown): string | undefined {
  if (!notes || typeof notes !== "string" || notes.trim() === "") return undefined;
  if (notes.trim().length > 1000) throw new Error("Notizen zu lang (max. 1000 Zeichen)");
  return notes.trim();
}

// -------------------------------------------------------
// Helper: resolve current user + their role in one round-trip
// -------------------------------------------------------
async function getCurrentUserAndRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, user, isAdmin: profile?.role === "admin" };
}

// -------------------------------------------------------
// Actions
// -------------------------------------------------------

export async function addGuest(formData: FormData) {
  const { supabase, user } = await getCurrentUserAndRole();

  const guestData = {
    name: validateName(formData.get("name")),
    email: validateEmail(formData.get("email")),
    visit_date: validateDate(formData.get("visit_date")),
    notes: validateNotes(formData.get("notes")),
    user_id: user.id,
  };

  const { error } = await supabase.from("guests").insert(guestData);
  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function deleteGuest(guestId: string) {
  if (!guestId || typeof guestId !== "string") throw new Error("Ungültige Gast-ID");

  const { supabase, user, isAdmin } = await getCurrentUserAndRole();

  // Explicit ownership/admin check — defence-in-depth on top of RLS
  const { data: guest } = await supabase
    .from("guests")
    .select("user_id")
    .eq("id", guestId)
    .single();

  if (!guest) throw new Error("Gast nicht gefunden");
  if (!isAdmin && guest.user_id !== user.id) throw new Error("Forbidden");

  const { error } = await supabase.from("guests").delete().eq("id", guestId);
  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function updateGuestStatus(
  guestId: string,
  status: "pending" | "checked_in" | "checked_out"
) {
  if (!guestId || typeof guestId !== "string") throw new Error("Ungültige Gast-ID");
  if (!ALLOWED_STATUSES.includes(status)) throw new Error("Ungültiger Status");

  const { supabase, user, isAdmin } = await getCurrentUserAndRole();

  // Ownership check: regular users can only manage their own guests.
  // Status changes (check-in/out) are admin-only by convention.
  const { data: guest } = await supabase
    .from("guests")
    .select("user_id")
    .eq("id", guestId)
    .single();

  if (!guest) throw new Error("Gast nicht gefunden");

  // Only admins may check guests in/out; owners may reset to pending
  if (status !== "pending" && !isAdmin) throw new Error("Nur Admins dürfen Status ändern");
  if (guest.user_id !== user.id && !isAdmin) throw new Error("Forbidden");

  const updateData: Record<string, string | null> = { status };
  if (status === "checked_in") updateData.check_in_time = new Date().toISOString();
  if (status === "checked_out") updateData.check_out_time = new Date().toISOString();

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId);
  if (error) throw new Error(error.message);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}

export async function sendGuestInvite(guestId: string, locale: "de" | "en" = "de") {
  if (!guestId || typeof guestId !== "string") throw new Error("Ungültige Gast-ID");

  const { supabase, user, isAdmin } = await getCurrentUserAndRole();

  const { data: guest, error } = await supabase
    .from("guests")
    .select("user_id, name, email, qr_token")
    .eq("id", guestId)
    .single();

  if (error || !guest) throw new Error("Gast nicht gefunden");
  if (!guest.email) throw new Error("Gast hat keine E-Mail-Adresse");

  // Only owner or admin may send invites
  if (guest.user_id !== user.id && !isAdmin) throw new Error("Forbidden");

  const { sendGuestInviteEmail } = await import("@/lib/email");
  await sendGuestInviteEmail(guest.email, guest.name, guest.qr_token, locale);

  revalidatePath("/[locale]/(dashboard)/guests", "page");
}
