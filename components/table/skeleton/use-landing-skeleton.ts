"use client";

import { useEffect, useRef, useState } from "react";
import {
  IUseLandingSkeletonProps,
  IUseLandingSkeletonReturn,
} from "./landing-skeleton.types";

const useLandingSkeleton = ({
  loadingFinishCountToLand = 1,
}: IUseLandingSkeletonProps = {}): IUseLandingSkeletonReturn => {
  const loadingFinishCountRef = useRef<number>(0);

  const [loading, setLoading] = useState<boolean>();
  const [hasLanded, setHasLanded] = useState<boolean>(false);

  useEffect(() => {
    if (loading === undefined) return;
    if (loading) return;
    if (hasLanded) return;

    loadingFinishCountRef.current += 1;
    if (loadingFinishCountRef.current >= loadingFinishCountToLand) {
      setHasLanded(true);
    }
  }, [loading, hasLanded, loadingFinishCountToLand]);

  return {
    loading: !!loading,
    setLoading,
    hasLanded,
  };
};

export { useLandingSkeleton };
