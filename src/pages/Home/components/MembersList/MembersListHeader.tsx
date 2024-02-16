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
import { ChevronDownIcon } from "lucide-react";

const orderByMap = {
  name: "Nome",
  state: "Estado",
  city: "Cidade",
} as Record<string, string>;

type MembersListHeaderProps = {
  orderedBy: string;
  totalMembers: number;
  isLoading?: boolean;
  onOrderChange: (value: OrderByType) => void;
};

export const MembersListHeader = ({
  orderedBy,
  totalMembers,
  isLoading,
  onOrderChange,
}: MembersListHeaderProps) => (
  <div className="h-[60px] border rounded-sm flex justify-between items-center px-4">
    <div className="text-sm">
      {isLoading
        ? "Buscando membros..."
        : `Exibindo
      ${totalMembers < maxMembersPerPage ? totalMembers : maxMembersPerPage} de
      ${totalMembers} itens`}
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
            onValueChange={(value) => onOrderChange(value as OrderByType)}
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
