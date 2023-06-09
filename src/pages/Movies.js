import React, { useState, useEffect } from "react"
import avatar from "../assets/images/avatar.png"
import MovieList from "../components/MovieList"
import Search from "../components/Search"
import useFetchMovies from "../hooks/useFetchMovies"
import { ReactComponent as IconMovieBig } from "../assets/icons/movie-big.svg"
import { ReactComponent as IconEditBig } from "../assets/icons/edit-big.svg"
import { useReviews } from "../hooks/useReviews"

function Movies() {
  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useState({
    baseUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
    page
  })
  const [reviewsCount, setReviewsCount] = useState(0)

  const { data, error } = useFetchMovies(searchParams)
  const { uniqueReviewedMovieIds } = useReviews()

  useEffect(() => {
    setReviewsCount(uniqueReviewedMovieIds.length)
  }, [uniqueReviewedMovieIds])

  const handleReviewsCountUpdate = (newReviewsCount) => {
    setReviewsCount(newReviewsCount)
  }

  useEffect(() => {
    if (data && !error) {
      setAllMovies(data.results)
      setFilteredMovies(data.results)
    }
  }, [data, error])
  useEffect(() => {
    console.log("Page has been updated:", page)
    setSearchParams((prevParams) => ({
      ...prevParams,
      page
    }))
  }, [page])

  const [resultsPerPage, setResultsPerPage] = useState(10)

  const onSearch = (newSearchParams, page = 1, resultsPerPage = 10) => {
    setPage(page)
    setResultsPerPage(resultsPerPage)

    let baseUrl = ""
    if (!newSearchParams || !newSearchParams.searchTerm) {
      baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
      setFilteredMovies(allMovies)
    } else {
      const { searchTerm, year, language } = newSearchParams
      const query = searchTerm ? searchTerm : " " // Here's the change
      baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
      if (year) {
        baseUrl += `&primary_release_year=${year}`
      }
      if (language) {
        baseUrl += `&language=${language}`
      }
    }

    setSearchParams({
      baseUrl,
      page,
      resultsPerPage
    })
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
              {data ? data.total_pages * 20 : 0}
            </p>
            <p className=" text-2xl font-light capitalize">total movie</p>
            <IconMovieBig className=" absolute -right-10 top-[15%] icon" />
          </div>
          <div className="relative overflow-hidden eviews">
            <p className=" text-5xl font-semibold mb-2">{reviewsCount}</p>
            <p className=" text-2xl font-light capitalize">Reviews written</p>
            <IconEditBig className=" absolute -right-10 top-[6%] icon" />
          </div>
        </div>
        <MovieList
          movies={filteredMovies}
          total_pages={data ? data.total_pages : 0}
          setPage={setPage}
          page={page}
          onReviewsCountUpdate={handleReviewsCountUpdate}
        />
      </div>
    </div>
  )
}

export default Movies
