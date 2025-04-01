import css from './Loader.module.css'
import ClipLoader from 'react-spinners/ClipLoader'
const Loader = () => (
  <ClipLoader
    color={css.color}
    loading={css.loading}
    cssOverride={css.override}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
)

export default Loader
