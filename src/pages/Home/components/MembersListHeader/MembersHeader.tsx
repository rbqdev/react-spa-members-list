import { Button } from "@lib/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@lib/shadcn/components/ui/dropdown-menu";
import { maxMembersPerPage } from "@pages/Home/constants";
import { OrderByType } from "@api/sharedTypes";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useContext } from "react";
import { HomeContext } from "@pages/Home/contexts/HomeContext";

const orderByMap = {
  name: "Nome",
  state: "Estado",
  city: "Cidade",
} as Record<string, string>;

type MembersListHeaderProps = {
  onOrderChange: () => void;
};

export const MembersListHeader = ({
  onOrderChange,
}: MembersListHeaderProps) => {
  const { totalMembers, orderedBy, setOrderedBy, isLoadingMembers } =
    useContext(HomeContext);

  const handleOrderChange = (value: string) => {
    setOrderedBy(value as OrderByType);
    onOrderChange();
  };

  return (
    <div className="h-[60px] border rounded-sm flex justify-between items-center px-4">
      <div className="text-sm">
        {isLoadingMembers ? (
          <div className="flex items-center gap-2">
            <Loader2Icon className="h-4 w-4 animate-spin" /> Buscando membros...
          </div>
        ) : (
          `Exibindo
      ${totalMembers < maxMembersPerPage ? totalMembers : maxMembersPerPage} de
      ${totalMembers} itens`
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Ordenar por:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              {orderByMap[orderedBy]}
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={orderedBy}
              onValueChange={handleOrderChange}
            >
              {Object.keys(orderByMap).map((key) => (
                <DropdownMenuRadioItem
                  key={`item-${orderByMap[key]}`}
                  value={key}
                >
                  {orderByMap[key]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
