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
import { useContext, useMemo } from "react";
import { HomeContext } from "@pages/Home/contexts/HomeContext";
import "./MembersHeader.styles.css";

const orderByMap = {
  name: "Nome",
  state: "Estado",
  city: "Cidade",
} as Record<string, string>;

type MembersHeaderProps = {
  onOrderChange: () => void;
};

export const MembersHeader = ({ onOrderChange }: MembersHeaderProps) => {
  const { totalMembers, orderedBy, setOrderedBy, isLoadingMembers } =
    useContext(HomeContext);

  const handleOrderChange = (value: string) => {
    setOrderedBy(value as OrderByType);
    onOrderChange();
  };

  const countCurrentItems = useMemo(
    () => (totalMembers < maxMembersPerPage ? totalMembers : maxMembersPerPage),
    [totalMembers]
  );

  return (
    <div className="members-header">
      <div className="text-sm">
        {isLoadingMembers ? (
          <div className="members-header__loader">
            <Loader2Icon /> Buscando membros...
          </div>
        ) : (
          `Exibindo
      ${countCurrentItems} de
      ${totalMembers} itens`
        )}
      </div>
      <div className="members-header__orderby">
        <span className="members-header__orderby-label">Ordenar por:</span>
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
