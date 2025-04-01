import css from './ImageCard.module.css'

const ImageCard = ({ children }) => {
  return <li className={css.card}>{children}</li>
}
export default ImageCard
