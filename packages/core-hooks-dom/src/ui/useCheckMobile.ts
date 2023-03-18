import { useMediaQuery } from "react-responsive";

export function useCheckMobile() {
  return useMediaQuery({ maxWidth: 600 });
}
