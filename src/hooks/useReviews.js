import { useState, useEffect } from "react"

export const useReviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews")
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews))
    }
  }, [])

  const [uniqueReviewedMovieIds, setUniqueReviewedMovieIds] = useState([])

  useEffect(() => {
    const uniqueIds = [...new Set(reviews.map((review) => review.id))]
    setUniqueReviewedMovieIds(uniqueIds)
  }, [reviews])

  const addReview = (id, review, rating) => {
    return new Promise((resolve, reject) => {
      try {
        const existingReviewIndex = reviews.findIndex((r) => r.id === id)
        let newReviews = []
        if (existingReviewIndex >= 0) {
          newReviews = [...reviews]
          newReviews[existingReviewIndex] = { id, review, rating }
        } else {
          newReviews = [...reviews, { id, review, rating }]
        }
        setReviews(newReviews)
        localStorage.setItem("reviews", JSON.stringify(newReviews))
        resolve(newReviews)
      } catch (error) {
        reject(error)
      }
    })
  }

  const [currentReview, setCurrentReview] = useState("")
  const [currentStars, setCurrentStars] = useState(0)

  const updateCurrentReviewForMovie = (movieId) => {
    const existingReviewInState = reviews.find((r) => r.id === movieId)
    if (existingReviewInState) {
      setCurrentReview(existingReviewInState.review)
      setCurrentStars(existingReviewInState.rating)
    } else {
      const existingReviewInLocalStorage = getReviewForMovie(Number(movieId))
      if (existingReviewInLocalStorage) {
        setCurrentReview(existingReviewInLocalStorage.review)
        setCurrentStars(existingReviewInLocalStorage.rating)
      } else {
        setCurrentReview("")
        setCurrentStars(0)
      }
    }
  }

  const getReviewForMovie = (id) => {
    return reviews.find((r) => r.id === id)
  }

  return {
    addReview,
    getReviewForMovie,
    currentReview,
    currentStars,
    updateCurrentReviewForMovie,
    reviews,
    uniqueReviewedMovieIds
  }
}
