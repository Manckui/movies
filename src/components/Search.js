import React, { useState, useEffect } from "react"
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Button,
  TextField
} from "@mui/material"
import useFetchMovies from "../hooks/useFetchMovies"
import { styled } from "@mui/system"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import useFetchLanguages from "../hooks/useFetchLanguages"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#fff"
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919eab"
  }
})

const CustomButton = styled(Button)({
  backgroundColor: "#5be584",
  color: "#fff"
})

const CustomFormControl = styled(FormControl)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919eab"
  }
})

const CustomSelect = styled(Select)({
  "& .MuiInputBase-input": {
    color: "#fff"
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919eab"
  }
})

const CustomDatePicker = styled(DatePicker)({
  "& .MuiInputBase-input": {
    color: "#919eab"
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919eab"
  }
})

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [year, setYear] = useState("")
  const [language, setLanguage] = useState("")
  const [searchUrl, setSearchUrl] = useState("")
  const { data: dataLang } = useFetchLanguages()

  const { data, error } = useFetchMovies(searchUrl)

  useEffect(() => {
    if (data && !error) {
      onSearch(data)
    }
  }, [data, error, onSearch])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleYearChange = (data) => {
    setYear(data || null)
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const handleSearch = () => {
    if (!searchTerm) {
      onSearch()
    } else {
      const searchParams = {
        baseUrl: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
        searchTerm: searchTerm,
        year: year,
        language: language
      }
      onSearch(searchParams)
    }
  }

  return (
    <div className="search">
      <CustomTextField
        variant="outlined"
        label="Insert the name of the movie"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="input"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomDatePicker
          label="Year"
          value={year instanceof Date ? year : null}
          onChange={handleYearChange}
          className="input"
          views={["year"]}
        />
      </LocalizationProvider>
      <CustomFormControl className="select">
        <InputLabel id="language-label" shrink={true}>
          Language
        </InputLabel>
        <CustomSelect
          variant="outlined"
          labelId="language-label"
          value={language}
          onChange={handleLanguageChange}>
          <MenuItem value="">All</MenuItem>
          {dataLang &&
            dataLang.map((lang) => {
              return (
                <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                  {lang.english_name}
                </MenuItem>
              )
            })}
        </CustomSelect>
      </CustomFormControl>
      <CustomButton
        variant="contained"
        onClick={handleSearch}
        className="button">
        <SearchIcon className="icon" />
        Search
      </CustomButton>
    </div>
  )
}

export default Search
