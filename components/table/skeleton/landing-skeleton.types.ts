import { ReactNode } from 'react';

export type LandingSkeletonProps = {
  skeleton: ReactNode;
  loading: boolean;
  hasLanded: boolean;
  children: ReactNode;
};
