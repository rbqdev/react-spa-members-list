import { Member, OrderByType } from "@api/sharedTypes";
import { UseStatesProps, useStates } from "hooks/useStates";
import { createContext, useState } from "react";
import { defaultCurrentPage } from "../constants";
import { ReactSetState } from "sharedTypes";

type HomeContexProps = UseStatesProps & {
  members: Member[];
  totalMembers: number;
  isLoadingMembers: boolean;
  orderedBy: OrderByType;
  currentMembersListPage: number;
  setMembers: ReactSetState<Member[]>;
  setTotalMembers: ReactSetState<number>;
  setOrderedBy: ReactSetState<OrderByType>;
  setIsLoadingMembers: ReactSetState<boolean>;
  setCurrentMembersListPage: ReactSetState<number>;
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
