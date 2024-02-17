import { Button } from "@lib/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lib/shadcn/components/ui/dropdown-menu";
import { ChevronDownIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import "./UserNav.styles.css";

export const UserNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="dropdown-menu-trigger">
        Robson Queiroz
        <ChevronDownIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1 font-normal">
          <p className="text-sm font-medium leading-none">Robson Queiroz</p>
          <p className="text-xs leading-none text-muted-foreground">
            rqueiroz@juntossomosmais.com.br
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <SettingsIcon className="w-4 h-4" />
          Configurações
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex gap-2 cursor-pointer text-red-600">
        <LogOutIcon className="w-4 h-4" />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
