import { Member, OrderByType } from "@api/sharedTypes";
import { UseStatesProps, useStates } from "hooks/useStates";
import { createContext, useState } from "react";

type ReacSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type HomeContexProps = UseStatesProps & {
  members: Member[];
  totalMembers: number;
  isLoadingMembers: boolean;
  orderedBy: OrderByType;
  currentMembersListPage: number;
  setMembers: ReacSetState<Member[]>;
  setTotalMembers: ReacSetState<number>;
  setOrderedBy: ReacSetState<OrderByType>;
  setIsLoadingMembers: ReacSetState<boolean>;
  setCurrentMembersListPage: ReacSetState<number>;
  resetMembersListPages: () => void;
};
export const HomeContext = createContext({} as HomeContexProps);

export function HomeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(false);
  const [orderedBy, setOrderedBy] = useState<OrderByType>(OrderByType.NAME);
  const [currentMembersListPage, setCurrentMembersListPage] = useState(1);
  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useStates();

  const resetMembersListPages = () => {
    setCurrentMembersListPage(1);
  };

  return (
    <HomeContext.Provider
      value={{
        members,
        totalMembers,
        isLoadingMembers,
        isLoadingStates,
        orderedBy,
        states,
        statesSelected,
        currentMembersListPage,
        setOrderedBy,
        setIsLoadingMembers,
        setTotalMembers,
        setMembers,
        setStatesSelected,
        setCurrentMembersListPage,
        resetMembersListPages,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
