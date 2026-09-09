import { redirect } from "next/navigation";

/** Opens the default board; see the note in ../dm/page.tsx. */
export default function WhiteboardIndexPage() {
  redirect("/workspace/whiteboard/wb_1");
}
