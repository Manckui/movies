import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IReview } from './use-reviews.types';

interface IReviewsStore {
  reviews: IReview[];
  saveReview: (review: IReview) => void;
}

export const useReviewsStore = create<IReviewsStore>()(
  persist(
    (set) => ({
      reviews: [],

      saveReview: (review) => {
        set((state) => ({
          reviews: [
            ...state.reviews.filter((r) => r.movieId !== review.movieId),
            review,
          ],
        }));
      },
    }),
    {
      name: 'movie-reviews',
      version: 1,
      // Clear previously saved reviews once; new reviews persist normally.
      migrate: () => ({ reviews: [] }),
    }
  )
);
