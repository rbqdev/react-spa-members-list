import { api } from "@api/api";
import { useEffect, useState } from "react";

export const useStates = () => {
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [states, setStates] = useState<Record<string, string>>({});
  const [statesSelected, setStatesSelected] = useState<string[]>([]);

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
  };
};
