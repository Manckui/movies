import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/images/logo.png"
import avatar from "../assets/images/avatar.png"
import { ReactComponent as StarIcon } from "../assets/icons/star.svg"
import { ReactComponent as MovieIcon } from "../assets/icons/movie.svg"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHeader = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="header">
      <div className="button-wrapper">
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <button onClick={toggleHeader} className="text-2xl uppercase lg:hidden">
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div className={`nav ${isOpen ? "open" : "closed"}`}>
        <div className="profile">
          <img src={avatar} alt="avatar" className="avatar" />
          <span>
            <p className="name text-2xl uppercase mb-2">stan lee</p>
            <p className="admin text-xl uppercase">admin</p>
          </span>
        </div>
        <nav className="links">
          <p className="text text-3xl uppercase mb-10">movies dashboard</p>
          <NavLink to="/" className="text-2xl uppercase link">
            <StarIcon className="icon" />
            <p>Movies</p>
          </NavLink>
          <NavLink to="/my-reviews" className="text-2xl uppercase link">
            <MovieIcon className="icon" />
            <p> My Reviews</p>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
