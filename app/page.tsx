import { redirect } from "next/navigation";
import { getCurrentProfile, getCurrentUser } from "@/lib/db/profiles";

export default async function IndexPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getCurrentProfile();
  if (!profile?.onboarding_completed) redirect("/onboarding");

  redirect("/home");
}
