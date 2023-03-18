import { useCallback, useMemo, useState } from "react";

export function useStep<T extends number>(defaultStep: T, max?: T) {
  const [value, setStep] = useState<number>(defaultStep);

  const next = useCallback(
    () => setStep((i) => (i === max ? i : i + 1)),
    [max]
  );

  const prev = useCallback(() => setStep((i) => (i === 0 ? i : i - 1)), []);

  return useMemo(
    () => ({ value, next, prev, setStep }),
    [value, next, prev, setStep]
  );
}
