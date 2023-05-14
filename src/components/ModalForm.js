import React, { useState } from "react"
import Modal from "react-modal"
import { FaStar } from "react-icons/fa"

Modal.setAppElement("#root")

function ModalForm() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
      color: "black",
      backgroundColor: "white",
      border: "1px solid black"
    }
  }

  return (
    <div className="modal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}>
        <button onClick={() => setModalIsOpen(false)}>Chiudi</button>
        <textarea
          placeholder="Reviews..."
          style={{ border: "1px solid black" }}></textarea>
        <div>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ border: "1px solid black" }}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

export default ModalForm
