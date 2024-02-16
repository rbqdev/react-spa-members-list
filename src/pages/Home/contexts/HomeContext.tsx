import { UseStatesProps, useStates } from "hooks/useStates";
import { createContext, useState } from "react";

type HomeContexProps = UseStatesProps & {
  currentMembersListPage: number;
  setCurrentMembersListPage: React.Dispatch<React.SetStateAction<number>>;
};
export const HomeContext = createContext({} as HomeContexProps);

export function HomeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentMembersListPage, setCurrentMembersListPage] = useState(1);
  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useStates();

  return (
    <HomeContext.Provider
      value={{
        isLoadingStates,
        states,
        statesSelected,
        setStatesSelected,
        currentMembersListPage,
        setCurrentMembersListPage,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
