import React, { useState } from "react"
import { Modal, TextField, Button, Box, Rating } from "@mui/material"

const ReviewModal = ({ open, onClose, movie, onSave }) => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)

  const handleSave = () => {
    onSave(movie, review, rating)
    setReview("")
    setRating(0)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          position: "fixed",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
        className="modal-content">
        <Button
          aria-label="chiudi"
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}>
          chiudi
        </Button>
        <h2 id="modal-modal-title" className=" text-base text uppercase">
          Recensione per{" "}
          <span className=" font-bold">
            {movie ? movie.original_title : ""}
          </span>
        </h2>
        <p className="text text-lg uppercase">lascia un voto da 1 a 10</p>
        <div className="mb-10">
          <Rating
            className="star"
            name="rating"
            value={rating}
            max={10}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
        </div>
        <p className="text text-lg uppercase">scrivi una piccola recensione</p>
        <TextField
          id="review-text"
          label="La tua recensione"
          multiline
          rows={4}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}>
          Salva recensione
        </Button>
      </Box>
    </Modal>
  )
}

export default ReviewModal
