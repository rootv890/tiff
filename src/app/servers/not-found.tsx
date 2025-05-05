import { Button } from "@/components/ui/button";
import { PiWarningCircleLight } from "react-icons/pi";

const ServerNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <PiWarningCircleLight className="text-foreground/40 size-16" />
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground/90">
          Server Not Found
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          The server you are looking for does not exist or may have been deleted.
        </p>
      </div>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};

export default ServerNotFound