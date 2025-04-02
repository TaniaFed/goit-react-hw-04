import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Loader from './components/Loader/Loader'
import toast, { Toaster } from 'react-hot-toast'
import { getPhotos } from './apiService/photos'
import ImageGallery from './components/ImageGallery/ImageGallery'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import { ImageModal } from './components/ImageModal/ImageModal'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [results, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState('')
  const [modalAlt, setModalAlt] = useState('')

  useEffect(() => {
    if (error) {
      toast('Oops! Something went wrong...')
    }
  }, [error])

  useEffect(() => {
    if (isEmpty) {
      toast('Sorry, nothing was found for your search... Try again!')
    }
  }, [isEmpty])

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
    setImages([])
    setPage(1)
    setError(null)
    setIsEmpty(false)
    setIsVisible(false)
  }

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const openModal = (src, alt) => {
    setIsOpen(true)
    setModalSrc(src)
    setModalAlt(alt)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalSrc('')
    setModalAlt('')
  }

  return (
    <div className="app">
      <header className="header">
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main className="gallery">
        {isLoading && <Loader className="loader" />}
        {results.length > 0 && (
          <ImageGallery results={results} openModal={openModal} />
        )}
        <Toaster position="top-left" />

        {error && <ErrorMessage />}

        {isVisible && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? 'LOADING...' : 'LOAD MORE'}
          </LoadMoreBtn>
        )}
        {isEmpty}
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          src={modalSrc}
          alt={modalAlt}
        />
      </main>
    </div>
  )
}

export default App
