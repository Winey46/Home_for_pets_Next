import Navigation from "@/components/Navigation";

const InformationLayout = ({children}) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default InformationLayout;