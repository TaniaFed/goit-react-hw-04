import ImageCard from '../ImageCard/ImageCard'
import css from './ImageGallery.module.css'

const ImageGallery = ({ children }) => {
  return (
    <ul>
      <li>{ImageCard}</li>
    </ul>
  )
}

export default ImageGallery
