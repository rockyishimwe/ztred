import { redirect } from "next/navigation";

/**
 * Opens the default channel. The workspace layout short-circuits its chrome for
 * anything under /workspace/channels (that route renders its own full shell),
 * so this page deliberately renders nothing but the redirect.
 */
export default function ChannelsIndexPage() {
  redirect("/workspace/channels/general");
}
