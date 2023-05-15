import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem
} from "@mui/material"
import { styled } from "@mui/system"
import { ReactComponent as IconArrowL } from "../assets/icons/arrow-l.svg"
import { ReactComponent as IconArrowR } from "../assets/icons/arrow-r.svg"
import { ReactComponent as IconShow } from "../assets/icons/show.svg"
import { ReactComponent as IconEdit } from "../assets/icons/edit.svg"
import ReviewModal from "../components/ReviewModal"

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#212B36"
})

const StyledTableHead = styled(TableHead)({
  backgroundColor: "rgba(145, 158, 171, 0.16)"
})

const CustomSelect = styled(Select)({
  border: 0
})

const MovieList = ({ movies, total_pages, setPage, page }) => {
  const [resultsPerPage, setResultsPerPage] = useState(5)
  const loading = false
  const error = null

  const resultsOptions = Array.from({ length: 6 }, (_, i) => i + 5)

  const handleChangeResultsPerPage = (event) => {
    setResultsPerPage(event.target.value)
  }

  const moviesToShow = movies ? movies : []
  const [reviewedMovies, setReviewedMovies] = useState(false)

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [currentMovie, setCurrentMovie] = useState(null)

  const handleOpenReviewModal = (movie) => {
    setCurrentMovie(movie)
    setIsReviewModalOpen(true)
  }
  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false)
  }

  const handleSaveReview = (movie, review, rating) => {
    setIsReviewModalOpen(false)
  }

  if (loading) {
    return <div>Caricamento in corso...</div>
  }

  if (error) {
    return <div>Errore</div>
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="simple table">
        <StyledTableHead>
          <TableRow className="table-header">
            <TableCell>Movies</TableCell>
            <TableCell align="right">Data di rilascio</TableCell>
            <TableCell align="right">Lingua originale</TableCell>
            <TableCell align="right">Totale recensioni</TableCell>
            <TableCell align="right">Media recensioni</TableCell>
            <TableCell align="right">Stato</TableCell>
            <TableCell align="right">Azioni</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody className="table-body">
          {Array.isArray(moviesToShow) &&
            moviesToShow.slice(0, resultsPerPage).map((movie) => (
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
                <TableCell align="right">
                  {reviewedMovies ? (
                    <p className="status-reviewed">Reviewed</p>
                  ) : (
                    <p className="status-not">Not Reviewed</p>
                  )}
                </TableCell>
                <TableCell align="right" className="button-tb">
                  {reviewedMovies ? (
                    <Link component={Link} to={`/movie/${movie.id}`}>
                      <IconShow />
                    </Link>
                  ) : (
                    <Button onClick={() => handleOpenReviewModal(movie)}>
                      <IconEdit />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell align="right" colSpan={12} className="final-row">
              <span className="mr-8">
                Rows per page:
                <CustomSelect
                  className="select-row"
                  value={resultsPerPage}
                  onChange={handleChangeResultsPerPage}>
                  {resultsOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </span>
              <span>
                <span className="mr-4">
                  page {page} - {total_pages}
                </span>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  <IconArrowL className={page === 1 ? "disable" : ""} />
                </Button>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= total_pages}>
                  <IconArrowR
                    className={page >= total_pages ? "disable" : ""}
                  />
                </Button>
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ReviewModal
        open={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        movie={currentMovie}
        onSave={handleSaveReview}
      />
    </StyledTableContainer>
  )
}

export default MovieList
