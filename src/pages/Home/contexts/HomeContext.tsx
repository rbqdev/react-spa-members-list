import { UseStatesProps, useStates } from "hooks/useStates";
import { createContext } from "react";

type HomeContexProps = UseStatesProps;
export const HomeContext = createContext({} as HomeContexProps);

export function HomeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useStates();

  return (
    <HomeContext.Provider
      value={{ isLoadingStates, states, statesSelected, setStatesSelected }}
    >
      {children}
    </HomeContext.Provider>
  );
}
