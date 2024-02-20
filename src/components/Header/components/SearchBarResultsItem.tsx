import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";
import { Link } from "react-router-dom";

type SearchBarResultsItemProps = {
  email: string;
  fistName: string;
  lastName: string;
  pictureUrl: string;
  onCloseSearchBar: () => void;
};

export const SearchBarResultsItem = ({
  email,
  fistName,
  lastName,
  pictureUrl,
  onCloseSearchBar,
}: SearchBarResultsItemProps) => {
  return (
    <Link
      className="searchbar-results__item"
      to={`/member/${btoa(email)}`}
      key={`search-${fistName}-${lastName}`}
      onClick={onCloseSearchBar}
      data-testid="searchBarItemLink"
    >
      <Avatar className="searchbar-results__item-avatar">
        <AvatarImage src={pictureUrl} alt={`${fistName}-${lastName}`} />
        <AvatarFallback
          className="searchbar-results__item-avatar-fallback"
          data-testid="saerchbarAvatarFallback"
        >
          {fistName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="searchbar-results__item-name">
        {fistName} {lastName}
      </div>
    </Link>
  );
};
