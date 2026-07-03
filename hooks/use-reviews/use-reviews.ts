import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IReview, IReviewsState } from './use-reviews.types';

interface IReviewsStore extends IReviewsState {
  addReview: (review: IReview) => void;
  updateReview: (review: IReview) => void;
  setEditingReview: (review: IReview | null) => void;
}

export const useReviewsStore = create<IReviewsStore>()(
  persist(
    (set) => ({
      reviews: [],
      editingReview: null,

      addReview: (review) => {
        set((state) => ({
          reviews: [
            ...state.reviews.filter((r) => r.movieId !== review.movieId),
            review,
          ],
        }));
      },

      updateReview: (review) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.movieId === review.movieId ? review : r
          ),
        }));
      },

      setEditingReview: (review) => set({ editingReview: review }),
    }),
    { name: 'movie-reviews' }
  )
);
