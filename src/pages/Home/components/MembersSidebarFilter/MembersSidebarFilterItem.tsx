import { Checkbox } from "@lib/shadcn/components/ui/checkbox";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import "./MembersSidebarFilterItem.styles.css";

type MembersSidebarFilterItemProps = {
  label: string;
  isChecked?: boolean;
  onItemCheckedChange: (value: string) => void;
};

export const MembersSidebarFilterItem = ({
  label,
  isChecked,
  onItemCheckedChange,
}: MembersSidebarFilterItemProps) => {
  return (
    <div className="members-sidebar-filter-item">
      <Checkbox
        id={label}
        onCheckedChange={() => onItemCheckedChange(label)}
        checked={isChecked}
      />
      <div className="members-sidebar-filter-item__content">
        <label htmlFor={label} className="members-sidebar-filter-item__label">
          {label}
        </label>
      </div>
    </div>
  );
};

export const MembersSidebarFilterItemSkeleton = () => {
  return (
    <div className="members-sidebar-filter-item">
      <Skeleton
        className="h-4 w-4 rounded-sm"
        style={{ background: "hsl(var(--jsm-muted))" }}
      />
      <div className="members-sidebar-filter-item__content">
        <Skeleton
          className="h-4 w-[100px]"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
      </div>
    </div>
  );
};
