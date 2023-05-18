import React, { useState, useEffect } from "react"
import avatar from "../assets/images/avatar.png"
import { ReactComponent as IconMovieBig } from "../assets/icons/movie-big.svg"
import { ReactComponent as IconEditBig } from "../assets/icons/edit-big.svg"
import ReviewedMovieList from "../components/ReviewedMovieList"

function MyReviews() {
  const [reviewedMovies, setReviewedMovies] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const reviews = localStorage.getItem("reviews")
    if (reviews) {
      const parsedReviews = JSON.parse(reviews)
      const movieIds = parsedReviews.map((review) => review.id)
      const moviesFromLocalStorage = movieIds.map((id) =>
        localStorage.getItem(`movie_${id}`)
      )
      setMovies(moviesFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    const reviews = localStorage.getItem("reviews")
    if (reviews) {
      const parsedReviews = JSON.parse(reviews)
      setReviewedMovies(parsedReviews.map((review) => review.id))
      const ratings = parsedReviews.map((review) => review.rating)
      const sum = ratings.reduce((total, rating) => total + rating, 0)
      const average = sum / ratings.length
      setAverageRating(average)
      setReviewsCount(parsedReviews.length)
    }
  }, [])

  // localStorage.clear()

  return (
    <div className="my-reviews">
      <span className="avatar">
        <img src={avatar} alt="avatar" />
      </span>
      <div>
        <div className="movies-header">
          <h1 className="title text-5xl">My Reviews</h1>
          <span className="header-wrapper">
            <p className="text active text-3xl">Home</p>
            <span className="circle"></span>
            <p className="text text-3xl">My Reviews</p>
          </span>
        </div>
        <div className="info-wrapper mb-10">
          <div className="total-reating relative overflow-hidden">
            <p className="text-5xl font-semibold mb-2">
              {averageRating.toFixed(2)}
            </p>
            <p className="text-2xl font-light capitalize">Average Rating</p>
            <IconMovieBig className="absolute -right-10 top-[15%] icon" />
          </div>
          <div className="relative overflow-hidden eviews">
            <p className="text-5xl font-semibold mb-2">{reviewsCount}</p>
            <p className="text-2xl font-light capitalize">Reviews written</p>
            <IconEditBig className="absolute -right-10 top-[6%] icon" />
          </div>
        </div>
        <ReviewedMovieList reviewedMovies={reviewedMovies} />
      </div>
    </div>
  )
}

export default MyReviews
