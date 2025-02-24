import { makePath } from "./paths.types";

// ROOTs
export const ROOT = "/";
export const REVIEW = makePath(ROOT, "/reviews");

export const MOVIE_DETAILS = (id: number) => makePath(ROOT, `details/${id}`);
