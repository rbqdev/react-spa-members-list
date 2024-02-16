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
    setIsLoading(false);
    setMembers(data);
  }, 800);

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
          <div className="px-4 py-4 text-zinc-500">Buscando membros...</div>
        )}

        {!isLoading && search && members.length === 0 && (
          <div className="px-4 py-4 text-zinc-500">
            Nenhum membro encontrado!
          </div>
        )}

        <div className="min-h-[80px] max-h-[400px] overflow-auto">
          {!isLoading && members.length > 0 && (
            <div className="flex flex-col gap-4 overflow-auto">
              <span className="uppercase text-xs py-2 bg-muted px-4">
                Membros encontrados:
              </span>
              {members.map(({ picture, name, email }) => (
                <Link
                  to={`/member/${btoa(email)}`}
                  key={`search-${name.first}-${name.last}`}
                  className="flex items-center py-2 px-4 hover:bg-muted cursor-pointer"
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
