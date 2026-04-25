"use client";

import { useEffect, useState } from "react";

export default function ChartBar({ value }: { value: number }) {
  const [height, setHeight] = useState(2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeight(value * 10);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="bar">
      <div className="bar-fill" style={{ height: `${height}px` }}></div>
    </div>
  );
}
