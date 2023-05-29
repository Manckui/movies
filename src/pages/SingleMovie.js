import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Button, Rating, TextField } from "@mui/material"
import { useReviews } from "../hooks/useReviews"
import MessageModal from "../components/MessageModal"

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

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

  const saveReview = async () => {
    try {
      await addReview(id, review, stars)
      setModalMessage("Recensione modificata con successo!")
    } catch (error) {
      setModalMessage(
        "Si è verificato un errore durante la modifica della recensione."
      )
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMessage("")
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
      <div className="container-movie min-h-[80vh] shadow-md  relative rounded-3xl">
        <div className=" absolute left-0 top-[-2px] h-[32rem] w-full rounded-3xl">
          <span className="backdrop rounded-3xl"></span>
          <span className=" relative  block h-full w-full rounded-3xl">
            <img
              className=" absolute left-0 top-0 object-cover h-full w-full  rounded-3xl"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
          </span>
        </div>
        <div className="body p-10 relative z-20 flex flex-col lg:flex-row">
          <img
            className="w-full lg:w-[50%] xl:w-[35%] mb-10 rounded-3xl shadow-md mr-10 h-[60vh] md:h-fit object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <span className=" lg:h-[30rem] box-content">
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
                text={`${movie.vote_average.toFixed(1)}`}
                styles={buildStyles({
                  pathColor: `rgba(0, 171, 85, ${movie.vote_average / 10})`,
                  textColor: "#00ab55"
                })}
              />
              <span className="ml-4 flex flex-col">
                <p className=" text-base uppercase">Average</p>
                <p className=" text-base uppercase">Points</p>
              </span>
            </div>
            <span>
              <p className="text-2xl mb-2 uppercase font-bold">Descrizione</p>
              <p className="text-lg mb-2 font-light">{movie.overview}</p>
            </span>
            <div className="mt-10 lg:mt-20 xl:mt-36 box-reting">
              <p className="text-2xl mb-6 font-bold uppercase">Review</p>
              <span className=" flex flex-col">
                <p className=" text-xl capitalize mb-2">vote (1-10)</p>
                <Rating
                  className="mb-14"
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
          </span>
        </div>
        <div className="p-8 flex items-center justify-between">
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
      <MessageModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  )
}

export default SingleMovie
