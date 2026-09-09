import { redirect } from "next/navigation";

/** Opens the default project board; see the note in ../dm/page.tsx. */
export default function TasksIndexPage() {
  redirect("/workspace/tasks/proj_1/board");
}
