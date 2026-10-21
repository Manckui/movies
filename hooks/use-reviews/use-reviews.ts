import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IReview, IReviewsState } from './use-reviews.types';

interface IReviewsStore extends IReviewsState {
  /** Aggiunge la recensione o sostituisce quella già scritta per lo stesso film */
  saveReview: (review: IReview) => void;
}

// persist salva automaticamente lo store nel localStorage con la chiave 'movie-reviews'
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
    { name: 'movie-reviews' }
  )
);
