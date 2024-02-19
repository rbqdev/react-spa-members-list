import { Member, OrderByType } from "@api/sharedTypes";
import { UseStatesProps, useStates } from "hooks/useStates";
import { createContext, useState } from "react";
import { defaultCurrentPage } from "../constants";
import { ReacSetState } from "sharedTypes";

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
  const [currentMembersListPage, setCurrentMembersListPage] =
    useState(defaultCurrentPage);
  const { isLoadingStates, states, statesSelected, setStatesSelected } =
    useStates();

  const resetMembersListPages = () => {
    setCurrentMembersListPage(defaultCurrentPage);
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
