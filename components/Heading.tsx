import Link from "next/link";
import Image from "next/image";

export default function Heading() {
  return (
    <section id="heading" className="w-full flex my-[175px] justify-center max-sm:flex-col max-sm:items-center">
      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="text-center text-[3.5rem] max-lg:text-[2.5rem] max-md:text-[1.75rem] mb-8">
          We are searching pets service.
        </h1>
        <div className="flex gap-[25px] max-md:flex-col">
          <Link
            href="/animalsList"
            className="button purple"
          >Find a pet</Link>
          <Link
            href="/information"
            className="button yellow"
          >
            More information
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2 max-sm:mt-8">
        <Image
          className="w-full rounded-[50%]"
          src="/dog-image.jpg"
          alt="Dog_image"
          width={512}
          height={512}
        />
      </div>
    </section>
  )
}