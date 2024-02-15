import LogoSvg from "@assets/img/Logo";
import Content from "@components/Content";
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
import { Input } from "@lib/shadcn/components/ui/input";
import {
  ChevronDownIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

const Logo = () => (
  <div className="w-[148px]">
    <LogoSvg />
  </div>
);

const SearchBar = () => (
  <div className="relative">
    <SearchIcon className="absolute left-4 top-4 h-4 w-4 opacity-60" />
    <Input
      placeholder="Buscar aqui"
      className="pl-10 min-w-[454px] h-[48px] rounded-full"
      // onFocus={onFocusSearchInput}
    />
  </div>
);

const UserNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="flex gap-2">
        Robson Queiroz
        <ChevronDownIcon className="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
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

export function Header() {
  return (
    <header
      className="h-[96px] flex items-center justify-center px-12 sticky top-0 z-10"
      style={{ background: "hsl(var(--jsm-muted))" }}
    >
      <Content className="flex items-center justify-between">
        <Logo />
        <SearchBar />
        <UserNav />
      </Content>
    </header>
  );
}
