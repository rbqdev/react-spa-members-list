import { Button } from "@lib/shadcn/components/ui/button";
import { MembersSidebarFilterItem } from "./MembersSidebarFilterItem";
import "./MembersSidebarFilter.styles.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@lib/shadcn/components/ui/drawer";
import { FilterIcon, Loader2Icon } from "lucide-react";
import { ReactSetState } from "sharedTypes";
import { Badge } from "@lib/shadcn/components/ui/badge";

type MembersDrawerFilterProps = {
  items: string[];
  itemsSelected: string[];
  isLoading: boolean;
  setStatesSelected: ReactSetState<string[]>;
  onItemCheckedChange: (value: string) => void;
};

export const MembersDrawerFilter = ({
  items,
  itemsSelected,
  isLoading,
  setStatesSelected,
  onItemCheckedChange,
}: MembersDrawerFilterProps) => {
  const handleResetStatesSelected = () => {
    setStatesSelected([]);
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="p-0">
          <Button
            variant="outline"
            disabled={isLoading}
            className="border rounded-sm flex items-center justify-center py-3 gap-2 uppercase"
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin h-4 w-4" />
            ) : (
              <FilterIcon className="w-4 h-4" />
            )}

            <span className="text-xs font-medium">Filtrar por estado</span>
            {itemsSelected.length > 0 && <Badge>{itemsSelected.length}</Badge>}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[350px]">
          <DrawerHeader>
            <DrawerDescription>
              Selecione um item para filtrar.
            </DrawerDescription>
          </DrawerHeader>

          <div className="members-sidebar-filter__content px-4">
            {items.map((label) => (
              <MembersSidebarFilterItem
                key={`filter-${label}`}
                label={label}
                onItemCheckedChange={onItemCheckedChange}
                isChecked={itemsSelected.includes(label)}
              />
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResetStatesSelected}
              >
                Resetar filtros
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
