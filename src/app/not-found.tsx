import { NotFoundScreen } from "@/components/ui/NotFoundScreen";

/** Root 404 — anything that does not match a route anywhere in the app. */
export default function NotFound() {
  return <NotFoundScreen homeHref="/" homeLabel="Back to home" />;
}
