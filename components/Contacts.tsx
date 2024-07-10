export default function Contacts() {
  return (
    <section
      id="contacts"
      className="flex flex-col items-center justify-center w-full mb-[250px] bg-purple-700 rounded-[10px] max-md:w-[610px] max-md:mb-[100px] max-sm:w-[360px]"
    >
      <div className="flex flex-col items-center w-[80%] my-[75px]">
        <h2 className="text-[3rem] text-neutral-100 max-md:text-[1.5rem]">Our Contacts:</h2>
        <a
          className="text-neutral-100 w-full text-[1.25rem] mx-[100px] hover:text-amber-300 max-md:text-[1rem]"
          href="mailto:home4pets46@gmail.com"
        >
          E-mail: home4pets46@gmail.com
        </a>
        <p className="text-neutral-100 w-full text-[1.25rem] mx-[100px] max-md:text-[1rem]">phone: 955-484-586</p>
        <p className="text-neutral-100 w-full text-[1.25rem] mx-[100px] max-md:text-[1rem]">address: Lorem ipsum street
                                                                                            46</p>
      </div>
    </section>
  )
}