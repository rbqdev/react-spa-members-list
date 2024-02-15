import { useStates } from "hooks/useStates";
import { SidebarFilter } from "./SidebarFilter";
import { useMemo, useState } from "react";
import { defaultLimitStates } from "@pages/Home/constants";

type SidebarFilterControllerProps = {
  onSetMembersListControllerKey: () => void;
};

export const SidebarFilterController = ({
  onSetMembersListControllerKey,
}: SidebarFilterControllerProps) => {
  const [shouldShowAllStates, setShouldShowAllStates] = useState(false);

  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useStates();

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
    onSetMembersListControllerKey();
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
