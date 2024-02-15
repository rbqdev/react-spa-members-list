import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lib/shadcn/components/ui/avatar";
import { Card, CardContent } from "@lib/shadcn/components/ui/card";
import { Skeleton } from "@lib/shadcn/components/ui/skeleton";
import { Member, OrderByType } from "@api/sharedTypes";
import { cn } from "@lib/shadcn/utils";

type MembersListItemProps = Pick<Member, "name" | "picture" | "location"> & {
  orderedBy: string;
};

export const MembersListItem = ({
  name,
  picture,
  location,
  orderedBy,
}: MembersListItemProps) => (
  <article key={`member-${name.first}-${name.last}`}>
    <Card className="min-h-[310px] min-w-[302px] flex justify-center items-center">
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <Avatar className="w-[80px] h-[80px] border">
          <AvatarImage
            src={picture.thumbnail}
            alt={`${name.first}-${name.last}`}
          />
          <AvatarFallback className="uppercase font-bold">
            {name.first.charAt(0)}
            {name.last.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-xl font-bold capitalize">
          {name.first} {name.last}
        </h4>
        <p className="text-sm capitalize">{location.street}</p>
        <div className="flex flex-col gap-1 text-xs text-center capitalize">
          <p className={cn(orderedBy === OrderByType.CITY ? "font-bold" : "")}>
            {location.city}
          </p>
          <p>
            <span
              className={cn(orderedBy === OrderByType.STATE ? "font-bold" : "")}
            >
              {location.state}
            </span>{" "}
            - CEP: {location.postcode}
          </p>
        </div>
      </CardContent>
    </Card>
  </article>
);

export const MembersListItemSkeleton = () => (
  <div>
    <Card className="min-h-[310px] min-w-[302px] flex justify-center items-center">
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <Avatar
          className="w-[80px] h-[80px] animate-pulse"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <Skeleton
          className="h-6 w-[200px]"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <Skeleton
          className="h-4 w-[200px]"
          style={{ background: "hsl(var(--jsm-muted))" }}
        />
        <div className="flex flex-col gap-2 text-xs text-center">
          <Skeleton
            className="h-4 w-[120px] animate-pulse"
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
          <Skeleton
            className="h-4 w-[120px] animate-pulse"
            style={{ background: "hsl(var(--jsm-muted))" }}
          />
        </div>
      </CardContent>
    </Card>
  </div>
);