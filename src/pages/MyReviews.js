import React, { useState } from "react"
import avatar from "../assets/images/avatar.png"

function MyReviews() {
  return (
    <div className="my-reviews ">
      <span className="avatar">
        <img src={avatar} alt="avatar" />
      </span>
      <div>
        <div className="movies-header">
          <h1 className="title text-5xl">My Reviews</h1>
          <span className="header-wrapper">
            <p className="text active text-3xl">Home</p>
            <span className="circle"></span>
            <p className="text text-3xl">My Reviews</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MyReviews
