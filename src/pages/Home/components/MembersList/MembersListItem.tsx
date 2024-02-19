import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";
import { Card, CardContent } from "@lib/shadcn/components/ui/card";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import { Member, OrderByType } from "@api/sharedTypes";
import { cn } from "@lib/shadcn/utils";
import { Link } from "react-router-dom";
import "./MembersListItem.styles.css";

type MembersListItemProps = Pick<
  Member,
  "name" | "email" | "picture" | "location"
> & {
  orderedBy: string;
};

export const MembersListItem = ({
  name,
  email,
  picture,
  location,
  orderedBy,
}: MembersListItemProps) => (
  <li>
    <Link to={`/member/${btoa(email)}`}>
      <Card className="members-list-item__card">
        <CardContent className="members-list-item__card-content">
          <Avatar className="members-list-item__avatar">
            <AvatarImage
              src={picture.large}
              alt={`${name.first}-${name.last}`}
            />
            <AvatarFallback>
              {name.first.charAt(0).toUpperCase()}
              {name.last.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <strong className="members-list-item__name">
            {name.first} {name.last}
          </strong>
          <p className="members-list-item__street">{location.street}</p>
          <div className="members-list-item__city-content">
            <span
              className={cn(orderedBy === OrderByType.CITY ? "font-bold" : "")}
            >
              {location.city}
            </span>
            <p>
              <span
                className={cn(
                  orderedBy === OrderByType.STATE ? "font-bold" : ""
                )}
              >
                {location.state}
              </span>{" "}
              - CEP: {location.postcode}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  </li>
);

export const MembersListItemSkeleton = () => (
  <li>
    <Card className="members-list-item__card">
      <CardContent className="members-list-item__card-content">
        <Avatar
          className="members-list-item__avatar"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <Skeleton
          className="h-6 w-[200px] animate-pulse"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <Skeleton
          className="h-4 w-[200px] animate-pulse"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <div className="members-list-item__city-content">
          <Skeleton
            className="h-4 w-[80px] animate-pulse"
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
          <Skeleton
            className="h-4 w-[120px] animate-pulse"
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
        </div>
      </CardContent>
    </Card>
  </li>
);
