import { useEffect, useState } from "react";
import { MembersList } from "./MembersList";
import { Member, OrderByType } from "@api/sharedTypes";
import { maxMembersPerPage } from "@pages/Home/constants";
import { api } from "@api/api";

type MembersListControllerProps = { statesSelected: string[] };

export const MembersListController = ({
  statesSelected,
}: MembersListControllerProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(false);
  const [orderedBy, setOrderedBy] = useState<OrderByType>(OrderByType.NAME);
  const [currentPage, setCurrentPage] = useState(1);

  const getMembers = async ({
    currentOffset = 0,
    currentOrderBy,
  }: {
    currentOffset?: number;
    currentOrderBy?: OrderByType;
    filterByStates?: string[];
  }) => {
    setIsLoadingMembers(true);
    const offset = currentOffset ? (currentOffset - 1) * maxMembersPerPage : 0;
    const { data, total } = await api.getMembers({
      offset,
      limit: maxMembersPerPage,
      orderBy: currentOrderBy ? currentOrderBy : orderedBy,
      filterByStates: statesSelected,
    });
    setMembers(data);
    setTotalMembers(total);
    setIsLoadingMembers(false);
  };

  const handleOrderByChange = (value: OrderByType) => {
    setOrderedBy(value);
    getMembers({
      currentOrderBy: value,
    });
  };

  const handleNextPage = () => {
    getMembers({
      currentOffset: currentPage + 1,
    });
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    getMembers({
      currentOffset: currentPage - 1,
    });
    setCurrentPage(currentPage - 1);
  };

  const handleGoToPage = (value: number) => {
    setCurrentPage(value);
    getMembers({ currentOffset: value });
  };

  useEffect(() => {
    getMembers({ currentOffset: currentPage });
  }, [currentPage, statesSelected]);

  return (
    <MembersList
      members={members}
      totalMembers={totalMembers}
      orderedBy={orderedBy}
      isLoading={isLoadingMembers}
      currentPage={currentPage}
      onOrderChange={handleOrderByChange}
      onGoToPage={handleGoToPage}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};
