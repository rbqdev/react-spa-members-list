import { SidebarFilter } from "./SidebarFilter";
import { useContext, useMemo, useState } from "react";
import { defaultLimitStates } from "@pages/Home/constants";
import { HomeContext } from "@pages/Home/contexts/HomeContext";

export const SidebarFilterController = () => {
  const [shouldShowAllStates, setShouldShowAllStates] = useState(false);

  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useContext(HomeContext);

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
  };

  return (
    <SidebarFilter
      items={computedStates}
      itemsSelected={statesSelected}
      isLoading={isLoadingStates}
      shouldShowAllItems={shouldShowAllStates}
      onShowAllItems={handleShowAllStates}
      onItemCheckedChange={handleFilterItemCheckedChange}
    />
  );
};
