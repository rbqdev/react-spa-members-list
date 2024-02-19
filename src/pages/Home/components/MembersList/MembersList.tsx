import { maxMembersPerPage } from "@pages/Home/constants";
import { MembersListItem, MembersListItemSkeleton } from "./MembersListItem";
import { MembersListPagination } from "./MembersListPagination";
import { Member } from "@api/sharedTypes";

type MembersListProps = {
  members: Member[];
  totalMembers: number;
  currentPage: number;
  orderedBy: string;
  isLoading?: boolean;
  onGoToPage: (value: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

export const MembersList = ({
  members,
  totalMembers,
  currentPage,
  isLoading,
  orderedBy,
  onGoToPage,
  onNextPage,
  onPreviousPage,
}: MembersListProps) => {
  return (
    <section className="flex-1">
      {/* hidden: Semantic section heading */}
      <h3 className="hidden">Seção de membros</h3>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-3 grid-flow-row gap-4 mb-6">
          {!isLoading &&
            members.map(({ name, email, location, picture }) => (
              <MembersListItem
                key={`member-${name.first}-${name.last}`}
                name={name}
                email={email}
                location={location}
                picture={picture}
                orderedBy={orderedBy}
              />
            ))}

          {isLoading &&
            [...new Array(maxMembersPerPage)].map((_, index) => (
              <MembersListItemSkeleton key={`member-loading-${index}`} />
            ))}
        </ul>

        {totalMembers > maxMembersPerPage && (
          <MembersListPagination
            totalMembers={totalMembers}
            currentPage={currentPage}
            goToPage={onGoToPage}
            nextPage={onNextPage}
            previousPage={onPreviousPage}
          />
        )}
      </div>
    </section>
  );
};
