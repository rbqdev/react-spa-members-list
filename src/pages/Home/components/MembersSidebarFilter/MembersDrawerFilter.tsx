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
import { FilterIcon } from "lucide-react";
import { ReacSetState } from "sharedTypes";

type MembersDrawerFilterProps = {
  items: string[];
  itemsSelected: string[];
  setStatesSelected: ReacSetState<string[]>;
  onItemCheckedChange: (value: string) => void;
};

export const MembersDrawerFilter = ({
  items,
  itemsSelected,
  setStatesSelected,
  onItemCheckedChange,
}: MembersDrawerFilterProps) => {
  const handleResetStatesSelected = () => {
    setStatesSelected([]);
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger className="border rounded-sm flex items-center justify-center py-3  gap-2 uppercase">
          <FilterIcon className="w-4 h-4" />
          <span className="text-xs font-medium">Filtrar por estado</span>
        </DrawerTrigger>
        <DrawerContent className="max-h-[400px]">
          <DrawerHeader>
            <DrawerDescription>
              Selecione um item para filtrar.
            </DrawerDescription>
          </DrawerHeader>

          <div className="members-sidebar-filter__content px-6 overflow-auto">
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
