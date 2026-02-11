import { ReactNode } from 'react';

export type LandingSkeletonProps = {
  skeleton: ReactNode;
  loading: boolean;
  hasLanded: boolean;
  children: ReactNode;
};

export interface IUseLandingSkeletonProps {
  loadingFinishCountToLand?: number;
}

export interface IUseLandingSkeletonReturn {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  hasLanded: boolean;
}
