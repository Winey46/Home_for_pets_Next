export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center w-full bg-[#fbc43c] rounded-[10px] mb-[250px] max-md:w-[610px] max-md:mb-[100px] max-sm:w-[360px]"
    >
      <div className="flex flex-col items-center justify-center w-[80%] my-[75px]">
        <h2 className="text-[3rem] max-md:text-[1.5rem] mb-8 font-bold">Our Mission</h2>
        <p className="text-[1.25rem] text-justify max-md:text-[1rem]">
          We want to help you give your pet the very best quality of life. In
          our opinion, the best way of doing this is to see the world as your
          pet sees it. We take this approach for everything from food and
          snacks
          to toys, bedding and other accessories. Every item we carry is
          something we would give to our own pets, with love and care.
        </p>
      </div>
    </section>
  )
}
