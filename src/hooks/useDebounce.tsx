import { useEffect, useRef } from "react";

export function useDebounce(value: any, delay: number, callback: any) {
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (value !== previousValueRef.current) {
      const handler = setTimeout(() => {
        callback(value);
      }, delay);

      previousValueRef.current = value;

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay, callback]);
}
