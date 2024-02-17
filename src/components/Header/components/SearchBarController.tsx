import { api } from "@api/api";
import { Member } from "@api/sharedTypes";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";
import { Badge } from "@lib/shadcn/components/ui/badge";
import { CommandDialog, CommandInput } from "@lib/shadcn/components/ui/command";
import { Input } from "@lib/shadcn/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

export const SearchBarController = () => {
  const [isSearchBarOpen, setIsSearcBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([] as Member[]);
  const [search, setSearch] = useState("");

  const onFocusSearchInput = () => {
    setIsSearcBarOpen(true);
  };

  const onCloseSearchBar = () => {
    setIsSearcBarOpen(false);
  };

  const handleChangeInput = debounce(async (currentSearch: string) => {
    setSearch(currentSearch);

    if (!currentSearch) {
      return;
    }

    setIsLoading(true);
    const { data } = await api.getMembersByName({ search: currentSearch });
    setMembers(data);
    setIsLoading(false);
  }, 600);

  useEffect(() => {
    const openSearchWithCommand = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearcBarOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", openSearchWithCommand);
    return () => document.removeEventListener("keydown", openSearchWithCommand);
  }, []);

  return (
    <>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-4 h-4 w-4 opacity-60" />
        <Input
          placeholder="Buscar aqui"
          className="pl-10 min-w-[454px] h-[48px] rounded-full"
          onFocus={onFocusSearchInput}
        />
        <Badge
          variant="secondary"
          className="absolute right-4 top-3.5 text-slate-400 text-[9px]"
        >
          Ctrl+J
        </Badge>
      </div>

      <CommandDialog open={isSearchBarOpen} onOpenChange={setIsSearcBarOpen}>
        <CommandInput
          placeholder="Digite para pesquisar membros por nome..."
          onValueChange={handleChangeInput}
        />

        {isLoading && (
          <div className="flex items-center justify-center w-full px-4 py-4 text-zinc-400">
            <div className="flex items-center gap-2">
              <Loader2Icon className="h-4 w-4 animate-spin" />
              <span className="text-xs">Buscando membros...</span>
            </div>
          </div>
        )}

        {!isLoading && search && members.length === 0 && (
          <div className="text-xs text-center px-4 py-4 text-zinc-400">
            Nenhum membro encontrado!
          </div>
        )}

        <div className="max-h-[400px] overflow-auto">
          {!isLoading && members.length > 0 && (
            <div className="flex flex-col overflow-auto">
              <span className="uppercase text-xs py-2 px-4 text-zinc-400">
                Membros encontrados:
              </span>
              {members.map(({ picture, name, email }) => (
                <Link
                  to={`/member/${btoa(email)}`}
                  key={`search-${name.first}-${name.last}`}
                  className="flex items-center py-3 px-4 gap-2 hover:bg-muted cursor-pointer border-t border-t-zinc-100"
                  onClick={onCloseSearchBar}
                >
                  <Avatar className="w-[50px] h-[50px] border">
                    <AvatarImage
                      src={picture.large}
                      alt={`${name.first}-${name.last}`}
                    />
                    <AvatarFallback className="uppercase font-bold">
                      {name.first.charAt(0)}
                      {name.last.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="capitalize">
                    {name.first} {name.last}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CommandDialog>
    </>
  );
};
