export interface IMoviesTableFilters {
  title: string;
  year: string;
  language: string;
}

export interface IMoviesTableFiltersProps {
  value: IMoviesTableFilters;
  onChange: (value: IMoviesTableFilters) => void;
  titleOptions?: string[];
}
