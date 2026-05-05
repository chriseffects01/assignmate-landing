"use client";

import { useEffect, useState } from "react";
import MyChart from "./ChartMain";

export default function ChartBar({ value }: { value: number }) {
  const [height, setHeight] = useState(2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeight(value * 10);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return <MyChart />;
}
