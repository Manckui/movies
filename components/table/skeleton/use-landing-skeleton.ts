"use client";

import { useEffect, useState } from "react";

const useLandingSkeleton = (loading: boolean): boolean => {
  const [hasLanded, setHasLanded] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) setHasLanded(true);
  }, [loading]);

  return hasLanded;
};

export { useLandingSkeleton };
