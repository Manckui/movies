import React, { useState, useEffect } from "react"
import avatar from "../assets/images/avatar.png"
import MovieList from "../components/MovieList"
import Search from "../components/Search"
import useFetchMovies from "../hooks/useFetchMovies"
import { ReactComponent as IconMovieBig } from "../assets/icons/movie-big.svg"
import { ReactComponent as IconEditBig } from "../assets/icons/edit-big.svg"

function Movies() {
  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useState({
    baseUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
    page
  })

  const { data, error } = useFetchMovies(searchParams)

  useEffect(() => {
    if (data && !error) {
      setAllMovies(data.results)
      setFilteredMovies(data.results)
    }
  }, [data, error])
  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page
    }))
  }, [page])

  const onSearch = (newSearchParams, page = 1) => {
    setPage(page)
    if (!newSearchParams) {
      setSearchParams({
        baseUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
        page
      })
      setFilteredMovies(allMovies)
    } else {
      setSearchParams({
        ...newSearchParams,
        baseUrl: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
        page
      })
    }
  }

  return (
    <div className="movies">
      <span className="avatar">
        <img src={avatar} alt="avatar" />
      </span>
      <div>
        <div className="movies-header">
          <h1 className="title text-5xl">Movies</h1>
          <span className="header-wrapper">
            <p className="text active text-3xl">Home</p>
            <span className="circle"></span>
            <p className="text text-3xl">Movies</p>
          </span>
        </div>
        <Search onSearch={onSearch} />
        <div className="info-wrapper mb-10">
          <div className="total-results relative overflow-hidden">
            <p className=" text-5xl font-semibold mb-2">
              {data ? data.total_results : 0}
            </p>
            <p className=" text-2xl font-light capitalize">total movie</p>
            <IconMovieBig className=" absolute -right-10 top-[15%] icon" />
          </div>
          <div className="relative overflow-hidden eviews">
            <p className=" text-5xl font-semibold mb-2">0</p>
            <p className=" text-2xl font-light capitalize">Reviews written</p>
            <IconEditBig className=" absolute -right-10 top-[6%] icon" />
          </div>
        </div>
        <MovieList
          movies={filteredMovies}
          total_pages={data ? data.total_pages : 0}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  )
}

export default Movies
