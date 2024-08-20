import Image from "next/image";

const ImagePreview = ({imgSrc}: { imgSrc: string }) => {
  return (
    <>
      <h3 className="text-[1.2rem] self-start font-[500]">Your image</h3>
      <div className="h-[150px] self-start">
        <Image
          className="max-h-full max-w-full w-auto object-contain border-[1px] border-black rounded-[5px]"
          src={imgSrc}
          alt="animal_image"
          width={256}
          height={256}
        />
      </div>
    </>
  )
}

export default ImagePreview;