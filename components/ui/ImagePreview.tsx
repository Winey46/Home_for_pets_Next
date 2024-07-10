import Image from "next/image";

const ImagePreview = ({imgSrc}: { imgSrc: string }) => {
  return (
    <>
      <h3 className="w-[80%] mb-[0.5rem] text-[1.2rem]">Your image</h3>
      <div className="w-[80%] h-[150px]">
        <img
          className="max-h-full max-w-full object-contain border-[1px] border-black rounded-[5px]"
          src={imgSrc}
          alt="animal_image"
          // width={150}
          // height={150}
        />
      </div>
    </>
  )
}

export default ImagePreview;