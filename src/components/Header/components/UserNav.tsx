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
import { LogOutIcon, SettingsIcon } from "lucide-react";
import "./UserNav.styles.css";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";

export const UserNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="dropdown-menu-trigger">
        <Avatar>
          <AvatarImage
            src="https://ui.shadcn.com/avatars/03.png"
            alt="@shadcn"
          />
          <AvatarFallback>RQ</AvatarFallback>
        </Avatar>
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
