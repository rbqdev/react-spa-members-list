import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";
import { Link } from "react-router-dom";

type SearchBarItemProps = {
  email: string;
  fistName: string;
  lastName: string;
  pictureUrl: string;
  onCloseSearchBar: () => void;
};

export const SearchBarItem = ({
  email,
  fistName,
  lastName,
  pictureUrl,
  onCloseSearchBar,
}: SearchBarItemProps) => {
  return (
    <Link
      className="results-item"
      to={`/member/${btoa(email)}`}
      key={`search-${fistName}-${lastName}`}
      onClick={onCloseSearchBar}
    >
      <Avatar className="results-item__avatar">
        <AvatarImage src={pictureUrl} alt={`${fistName}-${lastName}`} />
        <AvatarFallback className="results-item__avatar-fallback">
          {fistName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="results-item__name">
        {fistName} {lastName}
      </div>
    </Link>
  );
};
