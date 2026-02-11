"use client";
import { FrontOfficePage, Table } from "@/components";
import { ROOT } from "@/routes";
import { moviesColumns } from "./columns";
import { useTable } from "@/hooks";
import { useEffect, useState } from "react";
import { getMoviesList, IMovie } from "@/services";
import { IPaginatedList } from "@/utils";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Movies() {
  const theme = useTheme();
  const router = useRouter();

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }];

  const { tableProps, tableState } = useTable();

  const [movies, setMovies] = useState<IPaginatedList<IMovie>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await getMoviesList(tableState);
        setMovies(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [tableState]);

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Movies">
      <Table
        columns={moviesColumns(theme, router)}
        data={movies}
        loading={isLoading}
        {...tableProps}
      />
    </FrontOfficePage>
  );
}
