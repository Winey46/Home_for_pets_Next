import "@/styles/animalsList.scss";
import axios from "axios";

const AnimalsListPage = async () => {
  try {
    const response = await axios.get(
      'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json', {
        next: {revalidate: 1}
      })

    console.log(response.data)

  } catch (error) {
    console.log(error)
    // throw new Error(error.message,
    //   {
    //     status: error.response.status,
    //     statusText: error.response.statusText
    //   });
  }

  return (
    <div className="animals-list__wrapper">
      AnimalsListPage
      {/*<Filters*/}
      {/*  filtersHandle={filtersHandle}*/}
      {/*  filtersReset={filtersReset}*/}
      {/*  typeValue={postQuery}*/}
      {/*/>*/}
      {/*<div className="animals-list">*/}
      {/*  <ul className="animals-posts">*/}
      {/*    {postQuery.length > 0 ? pets.filter(animal =>*/}
      {/*      animal.type.toLowerCase() === postQuery[0] ||*/}
      {/*      animal.type.toLowerCase() === postQuery[1] ||*/}
      {/*      animal.type.toLowerCase() === postQuery[2]*/}
      {/*    ).map(animal => {*/}
      {/*      return <AnimalCart*/}
      {/*        key={animal.id}*/}
      {/*        to={`/animalsList/${animal.id}`}*/}
      {/*        src={animal.image.link ? animal.image.link : DefaultImage}*/}
      {/*        title={animal.title}*/}
      {/*      />*/}
      {/*    }) : pets.map(animal => {*/}
      {/*        return <AnimalCart*/}
      {/*          key={animal.id}*/}
      {/*          to={`/animalsList/${animal.id}`}*/}
      {/*          src={animal.image.link ? animal.image.link : DefaultImage}*/}
      {/*          title={animal.title}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    )}*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  )
}

export default AnimalsListPage;