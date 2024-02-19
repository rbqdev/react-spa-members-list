import { Button } from "@lib/shadcn/components/ui/button";
import {
  MembersSidebarItem,
  MembersSidebarItemSkeleton,
} from "./MembersSidebarItem";

type MembersSidebarProps = {
  items: string[];
  itemsSelected: string[];
  shouldShowAllItems: boolean;
  isLoading?: boolean;
  onItemCheckedChange: (value: string) => void;
  onShowAllItems: () => void;
};

export const MembersSidebar = ({
  items,
  isLoading,
  shouldShowAllItems,
  onItemCheckedChange,
  onShowAllItems,
}: MembersSidebarProps) => {
  return (
    <section className="min-w-[272px] max-h-[474px] min-h-[474px] border rounded-sm py-6 px-6 overflow-auto">
      <h3 className="text-lg font-medium">Por Estado</h3>
      <div className="flex flex-col gap-3 py-5">
        {!isLoading &&
          items.map((label) => (
            <MembersSidebarItem
              key={`filter-${label}`}
              label={label}
              onItemCheckedChange={onItemCheckedChange}
            />
          ))}
        {isLoading &&
          [...new Array(4)].map((_, index) => (
            <MembersSidebarItemSkeleton key={`filter-${index}`} />
          ))}
      </div>

      {!isLoading && (
        <Button
          variant="link"
          className="underline px-0 py-0"
          onClick={onShowAllItems}
        >
          Ver {shouldShowAllItems ? "menos" : "todos"}
        </Button>
      )}
    </section>
  );
};
