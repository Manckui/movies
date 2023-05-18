import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Button, Rating, TextField } from "@mui/material"
import { useReviews } from "../hooks/useReviews"

const SingleMovie = () => {
  const { id } = useParams()
  const {
    addReview,
    updateCurrentReviewForMovie,
    currentReview,
    currentStars
  } = useReviews()
  const [movie, setMovie] = useState(null)
  const [review, setReview] = useState(currentReview)
  const [stars, setStars] = useState(currentStars)

  useEffect(() => {
    updateCurrentReviewForMovie(id)
  }, [id, updateCurrentReviewForMovie])
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      setMovie(response.data)
    }
    fetchMovie()
  }, [id])

  useEffect(() => {
    setReview(currentReview)
    setStars(currentStars)
  }, [currentReview, currentStars])

  const handleReviewChange = (event) => {
    console.log(event.target.value)
    setReview(event.target.value)
  }

  const handleStarsChange = (event, newValue) => {
    console.log(newValue)
    setStars(newValue)
  }

  const saveReview = () => {
    addReview(id, review, stars)
  }

  if (!movie) return null

  return (
    <div className="single-movie">
      <div className="movies-header">
        <h1 className="title text-5xl">{movie.title}</h1>
        <span className="header-wrapper">
          <p className="text active text-3xl">Home</p>
          <span className="circle"></span>
          <p className="text text-3xl">Movie Review</p>
        </span>
      </div>
      <div className="container-movie shadow-md  relative rounded-3xl">
        <div className=" absolute left-0 top-[-2px] h-[35rem] w-full rounded-3xl">
          <span className="backdrop rounded-3xl"></span>
          <span className=" relative  block h-full w-full rounded-3xl">
            <img
              className=" absolute left-0 top-0 object-cover h-full w-full  rounded-3xl"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
          </span>
        </div>
        <div className="body p-10 relative z-20 flex">
          <img
            className=" h-[65vh] rounded-3xl shadow-md mr-10"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <span className="h-[30rem]">
            <h2 className="text-5xl mb-2">{movie.title}</h2>
            <span className=" mb-8  flex items-center">
              <p className=" text-xl uppercase">
                {movie.release_date}
                <span className="lang ml-2">
                  ({movie.original_language})
                </span>{" "}
              </p>
              <p className="mx-2 text-xl ">|</p>
              <p className=" text-xl">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </span>
            <div className="mb-8 flex items-center">
              <CircularProgressbar
                value={movie.vote_average * 10}
                text={`${movie.vote_average}`}
                styles={buildStyles({
                  pathColor: `rgba(0, 171, 85, ${movie.vote_average / 10})`,
                  textColor: "#fff"
                })}
              />
              <span className="ml-4 flex flex-col">
                <p className=" text-base uppercase">Average</p>
                <p className=" text-base uppercase">Points</p>
              </span>
            </div>
            <span>
              <p className="text-3xl mb-2">Descrizione</p>
              <p className="text-lg mb-2 font-light">{movie.overview}</p>
            </span>
          </span>
        </div>
        <div className="box-white pr-10">
          <p className=" text-2xl mb-4 font-bold">Review</p>
          <span className=" flex flex-col">
            <p className=" text-xl capitalize mb-2">vote (1-10)</p>
            <Rating
              className="mb-5"
              name="simple-controlled"
              value={stars}
              max={10}
              size="large"
              onChange={handleStarsChange}
            />
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Your Review"
              multiline
              rows={4}
              value={review}
              onChange={handleReviewChange}
              variant="outlined"
            />
          </span>
        </div>
        <div className="px-8 flex items-center justify-between h-[8rem]">
          <Button
            href={movie.homepage}
            target="_blanck"
            className="button-website">
            Visit website
          </Button>
          <Button className="button-review" onClick={saveReview}>
            Save Review
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SingleMovie
