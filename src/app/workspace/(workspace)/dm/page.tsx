import { redirect } from "next/navigation";

/**
 * `/workspace/dm` has no list of its own — the [userId] route already renders
 * a conversation sidebar next to the thread, so the index just opens the first
 * conversation. Exists so the nav can point at `/workspace/dm` (which prefix-
 * matches for the active state) instead of a hardcoded id that 404s if the
 * mock data changes.
 */
export default function DirectMessagesPage() {
  redirect("/workspace/dm/sam_rivera");
}
