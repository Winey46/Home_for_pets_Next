import Link from "next/link";
import Image from "next/image";

export default function Heading() {
  return (
    <div id="heading" className="heading__wrapper">
      <div className="heading-title__wrapper">
        <h1 className="heading-title">
          We are searching pets service.
        </h1>
        <div className="heading-buttons__wrapper">
          <Link href="/animalsList" className="button purple">Find a pet</Link>
          <Link href="/information" className="button yellow">
            More information
          </Link>
        </div>
      </div>
      <div className="heading-image__wrapper">
        <Image
          className="heading-image"
          src="/dog-image.jpg"
          alt="Dog_image"
          width={512}
          height={512}
        />
      </div>
    </div>
  )
}