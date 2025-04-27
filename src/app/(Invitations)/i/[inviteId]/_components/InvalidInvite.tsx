import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const InvalidInviteCard = () => {
  return (
    <Card className="w-full max-w-sm rounded-3xl bg-card text-card-foreground shadow-lg">
      <CardHeader className="flex flex-col items-center text-center pt-6">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl font-bold mb-4">
          !
        </div>
        <CardTitle className="text-2xl font-bold mb-2">
          Invalid Invite
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          This invite link may have expired or is invalid.
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button variant="outline" className="w-full py-6 text-lg" onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </CardFooter>
    </Card>
  );
};
export default InvalidInviteCard