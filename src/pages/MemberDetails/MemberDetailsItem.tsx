import { Separator } from "@lib/shadcn/components/ui/separator";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import { cn } from "@lib/shadcn/utils";
import "./MemberDetailsItem.styles.css";

type MemberDetailsItemProps = {
  label: string;
  children: React.ReactNode;
};

export function MemberDetailsItem({ label, children }: MemberDetailsItemProps) {
  return (
    <>
      <Separator />
      <div className="member-details-item">
        <b className="member-details-item__label">{label}</b>
        <div className="member-details-item__content">{children}</div>
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
      <div className="member-details-item">
        <div className="member-details-item__label">
          <Skeleton className="member-details-item__label-skeleton" />
        </div>
        <div className="member-details-item__content">
          <Skeleton
            className={cn(
              "member-details-item__content-skeleton",
              customContentClass
            )}
          />
        </div>
      </div>
    </>
  );
}
