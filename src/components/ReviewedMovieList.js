import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material"
import { styled } from "@mui/system"
import { ReactComponent as IconShow } from "../assets/icons/show.svg"

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#212B36"
})

const StyledTableHead = styled(TableHead)({
  backgroundColor: "rgba(145, 158, 171, 0.16)"
})

const ReviewedMovieList = ({ reviewedMovies }) => {
  const [movies, setMovies] = useState([])
  const reviews = localStorage.getItem("reviews")
    ? JSON.parse(localStorage.getItem("reviews"))
    : []

  const getMyRating = (movieId) => {
    const review = reviews.find((review) => review.id === movieId)

    return review ? review.rating : "N/A"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
        )
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="simple table">
        <StyledTableHead>
          <TableRow className="table-header">
            <TableCell>Film</TableCell>
            <TableCell align="right">Data di rilascio</TableCell>
            <TableCell align="right">Lingua originale</TableCell>
            <TableCell align="right">Numero totale di recensioni</TableCell>
            <TableCell align="right">Media delle recensioni</TableCell>
            <TableCell align="right">Mio Voto</TableCell>{" "}
            <TableCell align="right">Stato</TableCell>
            <TableCell align="right">Azioni</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody className="table-body">
          {Array.isArray(movies) &&
            movies
              .filter((movie) => reviewedMovies.includes(movie.id))
              .map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell component="th" scope="row">
                    <span className="img">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                      />
                    </span>
                    <p>{movie.original_title}</p>
                  </TableCell>
                  <TableCell align="right">{movie.release_date}</TableCell>
                  <TableCell align="right">{movie.original_language}</TableCell>
                  <TableCell align="right">{movie.vote_count}</TableCell>
                  <TableCell align="right">{movie.vote_average}</TableCell>
                  <TableCell align="right">{getMyRating(movie.id)}</TableCell>
                  <TableCell align="right">
                    <p className="status-reviewed">Recensito</p>
                  </TableCell>
                  <TableCell align="right" className="button-tb">
                    <Link to={`/movie/${movie.id}`}>
                      <IconShow />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          <TableRow>
            <TableCell
              align="right"
              colSpan={12}
              className="final-row h-[6rem]"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default ReviewedMovieList
