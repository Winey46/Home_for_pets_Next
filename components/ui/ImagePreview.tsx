const ImagePreview = ({imgSrc}: { imgSrc: string }) => {
  return (
    <>
      <h3 className="mb-[0.5rem] text-[1.2rem] self-start font-[500]">Your image</h3>
      <div className="h-[150px] self-start">
        <img
          className="max-h-full max-w-full object-contain border-[1px] border-black rounded-[5px]"
          src={imgSrc}
          alt="animal_image"
        />
      </div>
    </>
  )
}

export default ImagePreview;