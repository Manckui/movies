

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  vote_count: number; 
  original_language: string;
}

  
  export interface IMovieDto {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
  }
  