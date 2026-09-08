import { Spinner } from "@/components/ui/spinner";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function Check() {
  return (
    <div>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner show={false} />
      <Spinner size="small" className="size-4">
        <span>with children</span>
      </Spinner>
      <LoadingScreen label="Loading projects" variant="inline" />
    </div>
  );
}
