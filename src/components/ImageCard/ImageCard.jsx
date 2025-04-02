import css from './ImageCard.module.css'

const ImageCard = ({ alt_description, likes, urls, openModal }) => {
  return (
    <li className={css.card}>
      <img
        alt={alt_description}
        likes={likes}
        src={urls.small}
        onClick={() => openModal(urls.regular)}
      />
    </li>
  )
}
export default ImageCard
