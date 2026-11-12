import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IReview, IReviewsState } from './use-reviews.types';

interface IReviewsStore extends IReviewsState {
  saveReview: (review: IReview) => void;
  setEditingReview: (review: IReview | null) => void;
}

export const useReviewsStore = create<IReviewsStore>()(
  persist(
    (set) => ({
      reviews: [],
      editingReview: null,

      saveReview: (review) => {
        set((state) => ({
          reviews: [
            ...state.reviews.filter((r) => r.movieId !== review.movieId),
            review,
          ],
        }));
      },

      setEditingReview: (review) => set({ editingReview: review }),
    }),
    {
      name: 'movie-reviews',
      version: 1,
      // Clear previously saved reviews once; new reviews persist normally.
      migrate: () => ({ reviews: [], editingReview: null }),
    }
  )
);
