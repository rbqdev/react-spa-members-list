import { useCallback, useContext, useEffect } from "react";
import { MembersList } from "./MembersList";
import { OrderByType } from "@api/sharedTypes";
import { maxMembersPerPage } from "@pages/Home/constants";
import { api } from "@api/api";
import { HomeContext } from "@pages/Home/contexts/HomeContext";

export const MembersListController = () => {
  const {
    members,
    totalMembers,
    isLoadingMembers,
    statesSelected,
    currentMembersListPage,
    orderedBy,
    setMembers,
    setTotalMembers,
    setIsLoadingMembers,
    setCurrentMembersListPage,
  } = useContext(HomeContext);

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
      const { data, total } = await api.getMembers({
        offset: currentOffset,
        limit: maxMembersPerPage,
        orderBy: currentOrderBy ? currentOrderBy : orderedBy,
        filterByStates: statesSelected,
      });
      setMembers(data);
      setTotalMembers(total);
      setIsLoadingMembers(false);
    },
    [
      orderedBy,
      setIsLoadingMembers,
      setMembers,
      setTotalMembers,
      statesSelected,
    ]
  );

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
      onGoToPage={handleGoToPage}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};
