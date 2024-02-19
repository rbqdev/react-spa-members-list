import { api } from "@api/api";
import { useEffect, useState } from "react";
import { ReacSetState } from "sharedTypes";

export type UseStatesProps = {
  states: Record<string, string>;
  statesSelected: string[];
  setStatesSelected: ReacSetState<string[]>;
  isLoadingStates: boolean;
};

export const useStates = () => {
  const [states, setStates] = useState<Record<string, string>>({});
  const [statesSelected, setStatesSelected] = useState<string[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);

  const getStates = async () => {
    setIsLoadingStates(true);
    const { data } = await api.getStates();
    setStates(data);
    setIsLoadingStates(false);
  };

  useEffect(() => {
    getStates();
  }, []);

  return {
    states,
    statesSelected,
    setStatesSelected,
    isLoadingStates,
  } as UseStatesProps;
};
