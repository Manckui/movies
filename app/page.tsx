"use client";
import { FrontOfficePage, Table } from "@/components"
import { ROOT } from "@/routes"
import { moviesColumns } from "./columns"
import { useTable } from "@/hooks";
import { useEffect, useState } from "react";
import { getMoviesList, IMovieDto } from "@/services";
import { IPaginatedList } from "@/utils";

export default function Movies() {
  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }]

    const { tableProps, tableState
     } =
      useTable();
  
    const [movies, setMovies] = useState<IPaginatedList<IMovieDto>>();

    
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const res = await getMoviesList(tableState);
          console.log('res', res)
          setMovies(res);
        } catch (error) {
          console.error(error);
        } finally {
        }
      };
    
      fetchMovies();
    }, [tableState]);
  

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Movies">
        <Table
        columns={moviesColumns()}
        data={movies}
        {...tableProps}
        />
    </FrontOfficePage>
  )
}
