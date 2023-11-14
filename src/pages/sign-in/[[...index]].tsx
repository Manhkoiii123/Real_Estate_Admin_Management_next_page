import { LayoutMain } from "@/components/layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <LayoutMain>
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
    </LayoutMain>
  );
}
