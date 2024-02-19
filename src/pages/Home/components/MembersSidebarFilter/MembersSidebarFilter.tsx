import { Button } from "@lib/shadcn/components/ui/button";
import {
  MembersSidebarFilterItem,
  MembersSidebarFilterItemSkeleton,
} from "./MembersSidebarFilterItem";
import "./MembersSidebarFilter.styles.css";

type MembersSidebarFilterProps = {
  items: string[];
  shouldShowAllItems: boolean;
  isLoading?: boolean;
  onItemCheckedChange: (value: string) => void;
  onShowAllItems: () => void;
};

export const MembersSidebarFilter = ({
  items,
  isLoading,
  shouldShowAllItems,
  onItemCheckedChange,
  onShowAllItems,
}: MembersSidebarFilterProps) => {
  return (
    <aside className="members-sidebar-filter">
      <h3 className="members-sidebar-filter__title">Por Estado</h3>
      <div className="members-sidebar-filter__content">
        {!isLoading &&
          items.map((label) => (
            <MembersSidebarFilterItem
              key={`filter-${label}`}
              label={label}
              onItemCheckedChange={onItemCheckedChange}
            />
          ))}
        {isLoading &&
          [...new Array(4)].map((_, index) => (
            <MembersSidebarFilterItemSkeleton key={`filter-${index}`} />
          ))}
      </div>

      {!isLoading && (
        <Button
          variant="link"
          className="members-sidebar-filter__button"
          onClick={onShowAllItems}
        >
          Ver {shouldShowAllItems ? "menos" : "todos"}
        </Button>
      )}
    </aside>
  );
};
