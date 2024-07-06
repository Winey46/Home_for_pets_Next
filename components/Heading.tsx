import Link from "next/link";
import Image from "next/image";

export default function Heading() {
  return (
    <div id="heading" className="w-[960px] flex my-175px max-md:w-[610px] max-sm:w-[360px]">
      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="text-center text-[3.5rem] max-md:text-[1.75rem]">
          We are searching pets service.
        </h1>
        <div className="flex gap-[25px] max-md:flex-col">
          <Link
            href="/animalsList"
            className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] text-neutral-100 bg-purple-600 hover:bg-purple-700 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          >Find a pet</Link>
          <Link
            href="/information"
            className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] bg-amber-400 hover:bg-amber-500 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          >
            More information
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <Image
          className="w-full rounded-[50%]"
          src="/dog-image.jpg"
          alt="Dog_image"
          width={512}
          height={512}
        />
      </div>
    </div>
  )
}