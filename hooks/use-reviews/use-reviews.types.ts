export interface IReview {
  movieId: number;
  text: string;
  rating: number;
  status?: string;
  title: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  vote_count: number;
  vote_average: number;
}

export interface IReviewsState {
  reviews: IReview[];
  editingReview: IReview | null;
}
