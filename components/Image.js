export default function Image({imgSrc}) {
  return (
    <>
      <h3 className="card-img__title">Your image</h3>
      <div className="post-image__wrapper">
        <img
          src={imgSrc}
          alt="animal_image"
          className="card-img"
        />
      </div>
    </>
  )
}