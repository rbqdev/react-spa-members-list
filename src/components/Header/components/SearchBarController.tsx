import { api } from "@api/api";
import { Member } from "@api/sharedTypes";
import { Badge } from "@lib/shadcn/components/ui/badge";
import { CommandDialog, CommandInput } from "@lib/shadcn/components/ui/command";
import { Input } from "@lib/shadcn/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Loader2Icon } from "lucide-react";
import "./SearchBar.styles.css";
import { SearchBarResultsItem } from "./SearchBarResultsItem";
import { useMediaQueries } from "hooks/useMediaQueries";
import { Button } from "@lib/shadcn/components/ui/button";

const SearchBarInputDesktop = ({
  onFocusSearchInput,
}: {
  onFocusSearchInput: () => void;
}) => (
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
);

const SearchBarInputMobile = ({
  onFocusSearchInput,
}: {
  onFocusSearchInput: () => void;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className="border"
    onClick={onFocusSearchInput}
  >
    <SearchIcon className="searchbar-icon-mobile" />
  </Button>
);

export const SearchBarController = () => {
  const [isSearchBarOpen, setIsSearcBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([] as Member[]);
  const [search, setSearch] = useState("");
  const { isMediumDevice } = useMediaQueries();

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
      {isMediumDevice ? (
        <SearchBarInputMobile onFocusSearchInput={onFocusSearchInput} />
      ) : (
        <SearchBarInputDesktop onFocusSearchInput={onFocusSearchInput} />
      )}

      {/* Modal Search */}
      <CommandDialog open={isSearchBarOpen} onOpenChange={setIsSearcBarOpen}>
        <CommandInput
          name="searchbar-modal-input"
          placeholder="Digite para pesquisar membros por nome..."
          onValueChange={handleChangeInput}
        />

        {isLoading && (
          <div className="searchbar-loader">
            <div className="searchbar-loader__content">
              <Loader2Icon className="searchbar-loader__icon" />
              <span className="text-xs">Buscando membros...</span>
            </div>
          </div>
        )}

        {!isLoading && search && members.length === 0 && (
          <div className="searchbar-empty-list">Nenhum membro encontrado!</div>
        )}

        <div className="searchbar-results">
          {!isLoading && members.length > 0 && (
            <ul className="searchbar-results__content">
              <span className="searchbar-results__label">
                Membros encontrados:
              </span>
              {members.map(({ picture, name, email }) => (
                <SearchBarResultsItem
                  key={`search-${name.first}-${name.last}`}
                  email={email}
                  fistName={name.first}
                  lastName={name.last}
                  pictureUrl={picture.large}
                  onCloseSearchBar={onCloseSearchBar}
                />
              ))}
            </ul>
          )}
        </div>
      </CommandDialog>
    </>
  );
};
