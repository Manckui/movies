import React, { useState } from "react"
import {
  Modal,
  TextField,
  Button,
  Box,
  Rating,
  IconButton
} from "@mui/material"

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
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          position: "fixed",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}>
        <Button
          aria-label="chiudi"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}>
          chiudi
        </Button>
        {/* <h2 id="modal-modal-title">Recensione per {movie.original_title}</h2> */}
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