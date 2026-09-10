// Next 14 renders the root not-found outside the layout's CSS chunk
// (`notFoundStyles: []` in the flight payload), so the 404 shipped completely
// unstyled. Importing the stylesheet here attaches it to this route too.
import '@/styles/globals.css';
import { NotFoundScreen } from "@/components/ui/NotFoundScreen";

/** Root 404 — anything that does not match a route anywhere in the app. */
export default function NotFound() {
  return <NotFoundScreen homeHref="/" homeLabel="Back to home" />;
}
