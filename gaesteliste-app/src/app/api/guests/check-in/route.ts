import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyToken } from "@/lib/token";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1. Verify admin session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Parse request body
  let token: string;
  try {
    const body = await request.json();
    token = body?.token;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  // 3. Verify HMAC signature — reject forged tokens before any DB query
  const verified = verifyToken(token);
  if (!verified) {
    return NextResponse.json({ error: "Invalid or tampered token" }, { status: 422 });
  }

  // 4. Look up guest by signed token value (exact match in DB)
  const { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("qr_token", token)
    .single();

  if (error || !guest) {
    return NextResponse.json({ error: "Guest not found" }, { status: 404 });
  }

  // 5. Determine action based on current status
  //    Flow: pending → checked_in → checked_out → (re-check-in via admin reset is supported)
  type CheckAction = "checked_in" | "checked_out";
  let action: CheckAction;

  if (guest.status === "pending" || guest.status === "checked_out") {
    action = "checked_in";
  } else if (guest.status === "checked_in") {
    action = "checked_out";
  } else {
    return NextResponse.json({ error: "Unexpected guest status" }, { status: 409 });
  }

  const updateData: Record<string, string | null> =
    action === "checked_in"
      ? { status: "checked_in", check_in_time: new Date().toISOString() }
      : { status: "checked_out", check_out_time: new Date().toISOString() };

  const { data: updated, error: updateError } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guest.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }

  return NextResponse.json({ guest: updated, action });
}
