import React from "react"
import { Modal, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

const MessageModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Modal
      open={isOpen}
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
          height: 300,
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
        <div className=" flex items-center justify-center h-full">
          <p className="text-4xl text uppercase text-center">{message}</p>
          <Button
            aria-label="chiudi"
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}>
            chiudi
          </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/my-reviews"
          sx={{ mt: 2 }}>
          Torna alle mie recensioni
        </Button>
      </Box>
    </Modal>
  )
}

export default MessageModal
