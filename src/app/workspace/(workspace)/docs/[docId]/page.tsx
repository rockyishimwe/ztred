"use client";

import { useParams } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { DocEditor } from "@/components/collaboration/DocEditor";
import { getDoc } from "@/lib/mock/docs";

export default function DocPage() {
  const params = useParams<{ docId: string }>();
  const doc = getDoc(typeof params?.docId === "string" ? params.docId : undefined);

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4">
      <NavLink
        href="/workspace/docs"
        className="text-xs font-medium text-purple-400 hover:underline mb-3 inline-block shrink-0"
      >
        ← All documents
      </NavLink>
      <DocEditor doc={doc} />
    </div>
  );
}
