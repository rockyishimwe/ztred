import { redirect } from "next/navigation";

/**
 * The app used to carry two parallel settings trees — `/settings/*` and
 * `/workspace/settings/*` — with their own layouts, their own nav lists and
 * drifted content: only one had Account and accessibility toggles, only the
 * other had Security, Members and Billing. Which one you landed in depended on
 * whether you clicked the sidebar Settings icon or your own avatar.
 *
 * `/workspace/settings` is now the single tree (it has the fuller nav and lives
 * inside the product shell). This catch-all keeps every old `/settings/...`
 * URL working by forwarding it to the matching page.
 */
const KNOWN_SECTIONS = new Set([
  "profile",
  "notifications",
  "appearance",
  "security",
  "members",
  "billing",
]);

export default function SettingsRedirect({
  params,
}: {
  params: { slug?: string[] };
}) {
  const section = params.slug?.[0];
  // `/settings/account` was folded into Profile and Security; send it to
  // Profile rather than 404ing an old bookmark.
  const target =
    section && KNOWN_SECTIONS.has(section) ? section : "profile";
  redirect(`/workspace/settings/${target}`);
}
