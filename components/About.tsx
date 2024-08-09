import { about } from "@/utils/texts";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center w-full bg-[#fbc43c] rounded-[10px] mb-[250px]"
    >
      <div className="flex flex-col items-center justify-center w-[80%] my-[75px]">
        <h2 className="text-[3rem] max-md:text-[1.5rem] mb-8 font-bold">Our Mission</h2>
        <p className="text-[1.25rem] text-justify max-md:text-[1rem]">
          {about}
        </p>
      </div>
    </section>
  )
}
