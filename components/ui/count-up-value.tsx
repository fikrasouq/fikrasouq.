"use client";

import { useEffect, useMemo, useState } from "react";

function parseDisplayValue(value: string) {
  const match = value.match(/[0-9]+(?:[.,][0-9]+)*/);

  if (!match) {
    return null;
  }

  const token = match[0];
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + token.length);
  const normalized = token.replace(/,/g, "");
  const number = Number(normalized);

  if (Number.isNaN(number)) {
    return null;
  }

  const decimals = normalized.includes(".") ? normalized.split(".")[1]?.length ?? 0 : 0;
  return { prefix, suffix, number, decimals };
}

function formatAnimatedValue(value: number, decimals: number) {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function CountUpValue({ value }: { value: string }) {
  const parsed = useMemo(() => parseDisplayValue(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDisplay(`${parsed.prefix}${formatAnimatedValue(parsed.number, parsed.decimals)}${parsed.suffix}`);
      return;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = parsed.number * eased;
      setDisplay(`${parsed.prefix}${formatAnimatedValue(nextValue, parsed.decimals)}${parsed.suffix}`);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [parsed, value]);

  return <>{display}</>;
}
