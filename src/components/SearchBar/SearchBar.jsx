import style from './SearchBar.module.css'
import { useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast('Введіть текст для пошуку!')

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleInput = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!query.trim()) {
      return notify()
    }

    onSubmit(query)

    setQuery('')
  }

  return (
    <header className={style.header}>
      <form className={style.formBox} onSubmit={handleSubmit}>
        <input
          className={style.input}
          onChange={handleInput}
          name="search"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={style.button} type="submit">
          Search
        </button>
      </form>
    </header>
  )
}

export default SearchBar
