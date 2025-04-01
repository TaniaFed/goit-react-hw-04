import { useState, useEffect } from 'react'
// import axios from 'axios'

import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
// import { getPhotos } from './apiService/photos'

import Loader from './components/Loader/Loader'
import { Toaster } from 'react-hot-toast'
import { getPhotos } from './apiService/photos'

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!query) return

    const fetchPhotos = async () => {
      setIsLoading(true)
      try {
        const { results, total_pages } = await getPhotos(query, page)

        if (!results.length) {
          setIsEmpty(true)
          return
        }
        setImages((prevImages) => [...prevImages, ...results])

        setIsVisible(page < total_pages)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPhotos()
  }, [page, query])

  const handleSearch = (inputValue) => {
    setQuery(inputValue)
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
    </>
  )
}

export default App
