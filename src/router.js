import React from "react"
import { Routes, Route } from "react-router-dom"
import Movies from "./pages/Movies"
import MyReviews from "./pages/MyReviews"
import SingleMovie from "./pages/SingleMovie"

const Router = () => (
  <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/my-reviews" element={<MyReviews />} />
    <Route path="/movie/:id" element={<SingleMovie />} />
  </Routes>
)

export default Router
