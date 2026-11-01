import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { parseFocus, type FocusKey } from "@/lib/tags";

export const useFocusParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = parseFocus(searchParams.get("focus"));

  const setFocus = useCallback(
    (next: FocusKey) => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);
          if (next === "all") params.delete("focus");
          else params.set("focus", next);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { focus, setFocus };
};
