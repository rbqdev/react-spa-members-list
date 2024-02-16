import { Separator } from "@lib/shadcn/components/ui/separator";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import { cn } from "@lib/shadcn/utils";

type MemberDetailsItemProps = {
  label: string;
  children: React.ReactNode;
};

export function MemberDetailsItem({ label, children }: MemberDetailsItemProps) {
  return (
    <>
      <Separator />
      <div className="flex item-center gap-8 py-5">
        <b className="flex items-center min-w-60">{label}</b>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </>
  );
}

export function MemberDetailsItemSkeleton({
  customContentClass,
}: {
  customContentClass?: string;
}) {
  return (
    <>
      <Separator />
      <div className="flex item-center gap-8 py-5">
        <div className="flex items-center min-w-60">
          <Skeleton
            className="h-6 w-[100px]"
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton
            className={cn("h-6 w-[200px]", customContentClass)}
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
        </div>
      </div>
    </>
  );
}
