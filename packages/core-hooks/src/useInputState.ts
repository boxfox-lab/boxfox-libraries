import { ChangeEventHandler, useCallback, useState } from "react";

export function useInputState(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleValueChange: ChangeEventHandler<{ value: string }> = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, handleValueChange, setValue] as const;
}
