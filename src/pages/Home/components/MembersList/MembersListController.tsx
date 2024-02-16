import { useCallback, useContext, useEffect, useState } from "react";
import { MembersList } from "./MembersList";
import { Member, OrderByType } from "@api/sharedTypes";
import { maxMembersPerPage } from "@pages/Home/constants";
import { api } from "@api/api";
import { HomeContext } from "@pages/Home/contexts/HomeContext";

export const MembersListController = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(false);
  const [orderedBy, setOrderedBy] = useState<OrderByType>(OrderByType.NAME);
  const { statesSelected, currentMembersListPage, setCurrentMembersListPage } =
    useContext(HomeContext);

  const getMembers = useCallback(
    async ({
      currentOffset = 0,
      currentOrderBy,
    }: {
      currentOffset?: number;
      currentOrderBy?: OrderByType;
      filterByStates?: string[];
    }) => {
      setIsLoadingMembers(true);
      const offset = currentOffset
        ? (currentOffset - 1) * maxMembersPerPage
        : 0;
      const { data, total } = await api.getMembers({
        offset,
        limit: maxMembersPerPage,
        orderBy: currentOrderBy ? currentOrderBy : orderedBy,
        filterByStates: statesSelected,
      });
      setMembers(data);
      setTotalMembers(total);
      setIsLoadingMembers(false);
    },
    [orderedBy, statesSelected]
  );

  const handleOrderByChange = (value: OrderByType) => {
    setOrderedBy(value);
    getMembers({
      currentOrderBy: value,
    });
  };

  const handleNextPage = () => {
    const currentOffset = currentMembersListPage + 1;
    setCurrentMembersListPage(currentOffset);
    getMembers({ currentOffset });
  };

  const handlePreviousPage = () => {
    const currentOffset = currentMembersListPage - 1;
    setCurrentMembersListPage(currentOffset);
    getMembers({ currentOffset });
  };

  const handleGoToPage = (value: number) => {
    setCurrentMembersListPage(value);
    getMembers({ currentOffset: value });
  };

  useEffect(() => {
    getMembers({ currentOffset: currentMembersListPage });
  }, [currentMembersListPage, statesSelected]);

  return (
    <MembersList
      members={members}
      totalMembers={totalMembers}
      orderedBy={orderedBy}
      isLoading={isLoadingMembers}
      currentPage={currentMembersListPage}
      onOrderChange={handleOrderByChange}
      onGoToPage={handleGoToPage}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};
