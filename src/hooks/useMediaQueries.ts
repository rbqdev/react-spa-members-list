import { useMediaQuery } from "@uidotdev/usehooks";

export const useMediaQueries = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );

  return {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
  };
};
