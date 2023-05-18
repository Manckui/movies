import { useState, useEffect } from "react"

export const useReviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews")
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews))
    }
  }, [])

  const addReview = (id, review, rating) => {
    return new Promise((resolve, reject) => {
      try {
        const newReviews = [...reviews]
        const existingReviewIndex = newReviews.findIndex((r) => r.id === id)
        if (existingReviewIndex > -1) {
          newReviews[existingReviewIndex] = { id, review, rating }
        } else {
          newReviews.push({ id, review, rating })
        }
        setReviews(newReviews)
        localStorage.setItem("reviews", JSON.stringify(newReviews))
        resolve(newReviews)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getReviewForMovie = (id) => {
    return reviews.find((r) => r.id === id)
  }

  return { reviews, addReview, getReviewForMovie }
}
