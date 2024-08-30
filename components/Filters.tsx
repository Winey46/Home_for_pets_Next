"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";

export default function Filters() {
  const [catFilter, setCatFilter] = useState<boolean>(false);
  const [dogFilter, setDogFilter] = useState<boolean>(false);
  const [birdFilter, setBirdFilter] = useState<boolean>(false);
  const [myPostsFilter, setMyPostsFilter] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession();

  const filtersHandle = () => {
    let url: string = "/animalsList";

    if (catFilter || dogFilter || birdFilter || myPostsFilter) {
      url = url + "?";

      if (catFilter) {
        if (url.includes("type")) url = url + "&" + "type=cat";
        else url = url + "type=cat";
      }

      if (dogFilter) {
        if (url.includes("type")) url = url + "&" + "type=dog";
        else url = url + "type=dog";
      }

      if (birdFilter) {
        if (url.includes("type")) url = url + "&" + "type=bird";
        else url = url + "type=bird";
      }

      if (myPostsFilter) {
        if (url.includes("type")) url = url + "&" + "myposts=true";
        else url = url + "myposts=true";
      }
    }

    router.push(url);
  };

  const filtersReset = () => {
    setCatFilter(false);
    setDogFilter(false);
    setBirdFilter(false);
    setMyPostsFilter(false);

    router.push("/animalsList");
  };

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
          <label htmlFor="checkbox-cat" className="text-neutral-100">
            Cat
          </label>
        </li>
        <li className="w-[80%]">
          <input
            type="checkbox"
            name="checkbox-dog"
            onChange={(event) => setDogFilter(event.target.checked)}
            checked={dogFilter}
          />
          <label htmlFor="checkbox-dog" className="text-neutral-100">
            Dog
          </label>
        </li>
        <li className="w-[80%]">
          <input
            type="checkbox"
            name="checkbox-parrot"
            onChange={(event) => setBirdFilter(event.target.checked)}
            checked={birdFilter}
          />
          <label htmlFor="checkbox-parrot" className="text-neutral-100">
            Bird
          </label>
        </li>
      </ul>
      {session?.status === "authenticated" && (
        <div className="w-[80%] mt-4">
          <input
            type="checkbox"
            name="checkbox-myposts"
            onChange={(event) => setMyPostsFilter(event.target.checked)}
            checked={myPostsFilter}
          />
          <label htmlFor="checkbox-myposts" className="text-neutral-100">
            Show only my posts
          </label>
        </div>
      )}
      <div className="flex gap-[25px] my-4">
        <Button
          handleClick={filtersHandle}
          className="button yellow"
          variants={{
            initial: { scale: 1 },
            animate: { scale: 1.2 },
          }}
          initial="initial"
          whileHover="animate"
          transition={{ type: "spring", stiffness: 50 }}
        >
          Ok
        </Button>
        <Button
          handleClick={filtersReset}
          className="button yellow"
          variants={{
            initial: { scale: 1 },
            animate: { scale: 1.2 },
          }}
          initial="initial"
          whileHover="animate"
          transition={{ type: "spring", stiffness: 50 }}
          disabled={!catFilter && !dogFilter && !birdFilter && !myPostsFilter}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
