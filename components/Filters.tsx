'use client';

import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const [catFilter, setCatFilter] = useState(false)
  const [dogFilter, setDogFilter] = useState(false)
  const [birdFilter, setBirdFilter] = useState(false)

  const router = useRouter()

  const filtersHandle = () => {
    if (catFilter && !dogFilter && !birdFilter) {
      router.push('/animalsList?type=cat')
    } else if (!catFilter && dogFilter && !birdFilter) {
      router.push('/animalsList?type=dog')
    } else if (!catFilter && !dogFilter && birdFilter) {
      router.push('/animalsList?type=bird')
    } else if (catFilter && dogFilter && !birdFilter) {
      router.push('/animalsList?type=cat&type=dog')
    } else if (catFilter && !dogFilter && birdFilter) {
      router.push('/animalsList?type=cat&type=bird')
    } else if (!catFilter && dogFilter && birdFilter) {
      router.push('/animalsList?type=dog&type=bird')
    } else if (catFilter && dogFilter && birdFilter) {
      router.push('/animalsList?type=cat&type=dog&type=bird')
    } else router.push('/animalsList')
  }

  const filtersReset = () => {
    setCatFilter(false)
    setDogFilter(false)
    setBirdFilter(false)

    router.push('/animalsList')
  }

  return (
    <div className="flex flex-col items-center w-[210px] h-fit bg-[#833de7] rounded-[5px] max-xl:mb-[5px]">
      <ul className="w-full mt-[15px] flex flex-col items-center text-neutral-100">
        Animal type
        <li className="w-[80%]">
          <input
            type="checkbox"
            name="checkbox-cat"
            onChange={(event) => setCatFilter(event.target.checked)}
            checked={catFilter}
          />
          <label
            htmlFor="checkbox-cat"
            className="text-neutral-100"
          >Cat</label>
        </li>
        <li className="w-[80%]">
          <input
            type="checkbox"
            name="checkbox-dog"
            onChange={(event) => setDogFilter(event.target.checked)}
            checked={dogFilter}
          />
          <label
            htmlFor="checkbox-dog"
            className="text-neutral-100"
          >Dog</label>
        </li>
        <li className="w-[80%]">
          <input
            type="checkbox"
            name="checkbox-parrot"
            onChange={(event) => setBirdFilter(event.target.checked)}
            checked={birdFilter}
          />
          <label
            htmlFor="checkbox-parrot"
            className="text-neutral-100"
          >Bird</label>
        </li>
      </ul>
      <div className="flex gap-[25px] my-[15px]">
        <Button
          handleClick={filtersHandle}
          className="button yellow"
        >Ok</Button>
        <Button
          handleClick={filtersReset}
          className={(catFilter || dogFilter || birdFilter) ?
            "button yellow" :
            "button grey"}
        >Reset</Button>
      </div>
    </div>
  )
}