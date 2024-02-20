import { MembersSidebarFilter } from "./MembersSidebarFilter";
import { useContext, useMemo, useState } from "react";
import { defaultLimitStates } from "@pages/Home/constants";
import { HomeContext } from "@pages/Home/contexts/HomeContext";
import { useMediaQueries } from "@hooks/useMediaQueries";
import { MembersDrawerFilter } from "./MembersDrawerFilter";

export const MembersSidebarFilterController = () => {
  const [shouldShowAllStates, setShouldShowAllStates] = useState(false);
  const { isMediumDevice } = useMediaQueries();

  const {
    isLoadingStates,
    states,
    statesSelected,
    setStatesSelected,
    resetMembersListPages,
  } = useContext(HomeContext);

  const computedStates = useMemo(() => {
    const response = Object.keys(states);
    return shouldShowAllStates
      ? response
      : response.slice(0, defaultLimitStates);
  }, [shouldShowAllStates, states]);

  const handleShowAllStates = () => {
    setShouldShowAllStates((value) => !value);
  };

  const handleFilterItemCheckedChange = (value: string) => {
    const updatedStates = statesSelected.includes(value)
      ? statesSelected.filter((state) => state !== value)
      : [...statesSelected, value];
    setStatesSelected(updatedStates);
    resetMembersListPages();
  };

  return isMediumDevice ? (
    <MembersDrawerFilter
      items={Object.keys(states)}
      itemsSelected={statesSelected}
      isLoading={isLoadingStates}
      setStatesSelected={setStatesSelected}
      onItemCheckedChange={handleFilterItemCheckedChange}
    />
  ) : (
    <MembersSidebarFilter
      items={computedStates}
      isLoading={isLoadingStates}
      shouldShowAllItems={shouldShowAllStates}
      onShowAllItems={handleShowAllStates}
      onItemCheckedChange={handleFilterItemCheckedChange}
    />
  );
};
