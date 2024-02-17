import { Checkbox } from "@lib/shadcn/components/ui/checkbox";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";

type MembersListSidebarItemProps = {
  label: string;
  onItemCheckedChange: (value: string) => void;
};

export const MembersListSidebarItem = ({
  label,
  onItemCheckedChange,
}: MembersListSidebarItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={label} onCheckedChange={() => onItemCheckedChange(label)} />
      <div className="grid gap-1.5 leading-none cursor-pointer">
        <label htmlFor={label} className="text-sm cursor-pointer capitalize">
          {label}
        </label>
      </div>
    </div>
  );
};

export const MembersListSidebarItemSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton
        className="h-4 w-4 rounded-sm"
        style={{ background: "hsl(var(--jsm-muted))" }}
      />
      <div className="grid gap-1.5 leading-none cursor-pointer">
        <Skeleton
          className="h-4 w-[100px]"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
      </div>
    </div>
  );
};
