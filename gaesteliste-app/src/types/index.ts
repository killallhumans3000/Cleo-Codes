export type UserRole = "admin" | "user";
export type GuestStatus = "pending" | "checked_in" | "checked_out";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  room_number: string | null;
  role: UserRole;
  created_at: string;
}

export interface Guest {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  visit_date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  status: GuestStatus;
  qr_token: string;
  notes: string | null;
  created_at: string;
  // Joined fields
  profiles?: Pick<Profile, "full_name" | "room_number">;
}

export interface GuestFormData {
  name: string;
  email?: string;
  visit_date: string;
  notes?: string;
}
