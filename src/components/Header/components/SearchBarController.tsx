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
import "./SearchBar.styles.css";

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
      <div className="searchbar">
        <SearchIcon className="searchbar-icon" />
        <Input
          className="searchbar-input"
          placeholder="Buscar aqui"
          onFocus={onFocusSearchInput}
        />
        <Badge className="searchbar-badge" variant="secondary">
          Ctrl+J
        </Badge>
      </div>

      {/* Modal Search */}
      <CommandDialog open={isSearchBarOpen} onOpenChange={setIsSearcBarOpen}>
        <CommandInput
          placeholder="Digite para pesquisar membros por nome..."
          onValueChange={handleChangeInput}
        />

        {isLoading && (
          <div className="loader">
            <div className="loader-content">
              <Loader2Icon className="loader-icon" />
              <span className="text-xs">Buscando membros...</span>
            </div>
          </div>
        )}

        {!isLoading && search && members.length === 0 && (
          <div className="empty-message">Nenhum membro encontrado!</div>
        )}

        <div className="results">
          {!isLoading && members.length > 0 && (
            <div className="results-content">
              <span className="results-label">Membros encontrados:</span>
              {members.map(({ picture, name, email }) => (
                <Link
                  to={`/member/${btoa(email)}`}
                  key={`search-${name.first}-${name.last}`}
                  className="results-item"
                  onClick={onCloseSearchBar}
                >
                  <Avatar className="results-item__avatar">
                    <AvatarImage
                      src={picture.large}
                      alt={`${name.first}-${name.last}`}
                    />
                    <AvatarFallback className="results-item__avatar-fallback">
                      {name.first.charAt(0)}
                      {name.last.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="results-item__name">
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
