import { useState } from 'react';
import { IReview, IReviewsState } from './use-reviews.types';

export const useReviewsStore = () => {
  const [state, setState] = useState<IReviewsState>({
    reviews: [],
    editingReview: null,
  });

  const addReview = (review: Omit<IReview, 'id'>) => {
    const newReview: IReview = { id: Date.now(), ...review };
    setState(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
  };

  const updateReview = (review: IReview) => {
    setState(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => (r.id === review.id ? review : r)),
    }));
  };

  const setEditingReview = (review: IReview | null) => {
    setState(prev => ({ ...prev, editingReview: review }));
  };

  return {
    reviews: state.reviews,
    editingReview: state.editingReview,
    addReview,
    updateReview,
    setEditingReview,
  };
};
