import { useState, useEffect } from "react"
import axios from "axios"

const useFetchMovies = ({ baseUrl, searchTerm, page }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let url = baseUrl
    if (searchTerm) {
      url += `&query=${searchTerm}`
    }
    url += `&page=${page}`

    console.log(page)

    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH_TOKEN
          }
        })
        setData(res.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [baseUrl, searchTerm, page])

  return { data, loading, error }
}

export default useFetchMovies
