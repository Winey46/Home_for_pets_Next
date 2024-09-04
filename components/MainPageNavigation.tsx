import Button from "@/components/ui/Button";

const MainPageNavigation = () => {
  return (
    <nav
      id="home-navigation"
      className="px-[2%] w-full self-start my-[25px] flex items-center gap-[30px] max-md:self-center max-md:my-[15px]"
    >
      <Button className="hover:cursor-pointer hover:text-[#ffb100]" scrollTo='#about'>
        About
      </Button>
      <Button className="hover:cursor-pointer hover:text-[#ffb100]" scrollTo='#contacts'>
        Contacts
      </Button>
    </nav>
  )
}

export default MainPageNavigation;