export interface IReview {
  id: number;
  movieId: number;
  text: string;
  rating: number;
  status?: string;
}

export interface IReviewsState {
  reviews: IReview[];
  editingReview: IReview | null;
}
