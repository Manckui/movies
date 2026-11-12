import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IReview } from './use-reviews.types';

interface IReviewsStore {
  reviews: IReview[];
  saveReview: (review: IReview) => void;
  deleteReview: (movieId: number) => void;
}

// Media dei voti personali, arrotondata a un decimale.
export const getAverageRating = (reviews: IReview[]) => {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

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

      deleteReview: (movieId) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.movieId !== movieId),
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
