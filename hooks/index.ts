"use client";
import { useEffect, useState } from "react";

/**
 * Безопасно выполняет callback только на клиенте.
 * Возвращает значение, которое вычисляется внутри браузера.
 */
export function useClientSafe<T>(callback: () => T, fallback?: T): T | undefined {
  const [value, setValue] = useState<T | undefined>(() => {
    // при SSR возвращаем fallback, чтобы избежать ReferenceError
    return typeof window === "undefined" ? fallback : undefined;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const result = callback();
        setValue(result);
      } catch (err) {
        console.error("[useClientSafe] Error:", err);
      }
    }
  }, [callback]);

  return value;
}