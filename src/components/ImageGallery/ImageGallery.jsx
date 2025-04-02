import ImageCard from '../ImageCard/ImageCard'

import css from './ImageGallery.module.css'

const ImageGallery = ({ results, openModal }) => {
  return (
    <ul className={css.imageList}>
      {results.map(({ id, alt_description, likes, urls }) => (
        <ImageCard
          key={id}
          alt={alt_description}
          likes={likes}
          urls={urls}
          openModal={openModal}
        />
      ))}
    </ul>
  )
}

export default ImageGallery
