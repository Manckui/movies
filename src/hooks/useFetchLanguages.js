import { useState, useEffect } from "react"
import axios from "axios"

const useFetchMovies = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_AUTH_TOKEN
            }
          }
        )
        setData(res.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export default useFetchMovies
