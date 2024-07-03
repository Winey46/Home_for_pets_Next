import Button from "./Button";
import {useContext} from "react";

export default function Filters() {
  // const {
  //   catFilter,
  //   dogFilter,
  //   birdFilter,
  //   setCatFilter,
  //   setDogFilter,
  //   setBirdFilter,
  // } = useContext(FiltersContext)

  return (
    <div className="filters">
      <ul className="filters-list">
        Animal type
        <li className="filters-list__element">
          <input
            type="checkbox"
            name="checkbox-cat"
            // onChange={(event) => setCatFilter(event.target.checked)}
            // checked={catFilter}
          />
          <label
            htmlFor="checkbox-cat"
            className="input-label"
          >Cat</label>
        </li>
        <li className="filters-list__element">
          <input
            type="checkbox"
            name="checkbox-dog"
            // onChange={(event) => setDogFilter(event.target.checked)}
            // checked={dogFilter}
          />
          <label
            htmlFor="checkbox-dog"
            className="input-label"
          >Dog</label>
        </li>
        <li className="filters-list__element">
          <input
            type="checkbox"
            name="checkbox-parrot"
            // onChange={(event) => setBirdFilter(event.target.checked)}
            // checked={birdFilter}
          />
          <label
            htmlFor="checkbox-parrot"
            className="input-label"
          >Bird</label>
        </li>
      </ul>
      <div className="buttons-wrapper">
        <Button
          // onClick={filtersHandle}
          className="button yellow"
        >Ok</Button>
        <Button
          // onClick={filtersReset}
          // className={(catFilter || dogFilter || birdFilter) ? "button yellow" : "button disabled"}
        >Reset</Button>
      </div>
    </div>
  )
}