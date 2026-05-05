import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/db/profiles";

export type SocialStats = {
  acceptedFriends: number;
  pendingRequests: number;
  sharedMilestones: number;
};

async function safeCount(query: PromiseLike<{ count: number | null; error: unknown }>) {
  try {
    const result = await query;
    if (result.error) return 0;
    return result.count ?? 0;
  } catch {
    return 0;
  }
}

export async function getSocialStats(): Promise<SocialStats> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return { acceptedFriends: 0, pendingRequests: 0, sharedMilestones: 0 };
  }

  const acceptedFriends = await safeCount(
    supabase
      .from("friend_connections")
      .select("id", { count: "exact", head: true })
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq("status", "accepted")
  );

  const pendingRequests = await safeCount(
    supabase
      .from("friend_connections")
      .select("id", { count: "exact", head: true })
      .eq("addressee_id", user.id)
      .eq("status", "pending")
  );

  const sharedMilestones = await safeCount(
    supabase
      .from("milestone_shares")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
  );

  return { acceptedFriends, pendingRequests, sharedMilestones };
}
