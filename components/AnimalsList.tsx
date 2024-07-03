import AnimalCart from "@/components/AnimalCart";

const AnimalsList = ({animals}) => {
  const pets = []

  for (let key in animals) {
    pets.push({
      id: key,
      title: animals[key].title,
      type: animals[key].animalType,
      image: {
        link: animals[key].image ? animals[key].image.link : DefaultImage,
      },
    })
  }
  pets.reverse()

  return (
    <div className="animals-list">
      <ul className="animals-posts">
        {/*{postQuery.length > 0 ? pets.filter(animal =>*/}
        {/*  animal.type.toLowerCase() === postQuery[0] ||*/}
        {/*  animal.type.toLowerCase() === postQuery[1] ||*/}
        {/*  animal.type.toLowerCase() === postQuery[2]*/}
        {/*).map(animal => {*/}
        {/*  return <AnimalCart*/}
        {/*    key={animal.id}*/}
        {/*    to={`/animalsList/${animal.id}`}*/}
        {/*    src={animal.image.link ? animal.image.link : DefaultImage}*/}
        {/*    title={animal.title}*/}
        {/*  />*/}
        {/*}) :*/}
        {pets.map(animal => {
            return <AnimalCart
              key={animal.id}
              to={`/animalsList/${animal.id}`}
              src={animal.image.link ? animal.image.link : '/pets-default.jpg'}
              title={animal.title}
            />
          }
        )}
      </ul>
    </div>
  )
}

export default AnimalsList;