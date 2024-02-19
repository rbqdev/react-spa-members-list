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
      <DropdownMenuLabel className="dropdown-menu-label__content">
        <p className="dropdown-menu-label__name">Robson Queiroz</p>
        <p className="dropdown-menu-label__email">
          rqueiroz@juntossomosmais.com.br
        </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="dropdown-menu-item">
          <SettingsIcon className="w-4 h-4" />
          Configurações
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="dropdown-menu-item text-red-600">
        <LogOutIcon className="w-4 h-4" />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
