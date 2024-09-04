"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { openArrow } from "@/utils/symbols";

export default function Filters() {
  const [filtersState, setFiltersState] = useState<boolean>(false);

  const [catFilter, setCatFilter] = useState<boolean>(false);
  const [dogFilter, setDogFilter] = useState<boolean>(false);
  const [birdFilter, setBirdFilter] = useState<boolean>(false);
  const [myPostsFilter, setMyPostsFilter] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession();

  const toggleNavigation = (): void => {
    setFiltersState((prevState) => !prevState);
  };

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
    <div className="flex flex-col items-center w-full h-fit p-[5px] gap-2 bg-[#833de7] rounded-[10px] max-xl:mb-[5px]">
      <div className="flex items-center gap-3 text-neutral-100  hover:text-[#fbc43c] hover:cursor-pointer" onClick={toggleNavigation}>
        <h2 className="text-xl">Filters</h2>
        <motion.span
          className="flex items-center justify-center bg-white rounded-[50%]"
          animate={{ rotate: filtersState ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {openArrow}
        </motion.span>
      </div>
      {filtersState && (
        <div className="flex self-start">
          <ul className="w-[250px] flex flex-col gap-1 p-[10px] text-neutral-100 border-x-[1px]">
            <h3 className="text-neutral-100 text-lg text-center">
              Animal type:
            </h3>
            <li className="hover:text-[#fbc43c]">
              <input
                type="checkbox"
                name="checkbox-cat"
                onChange={(event) => setCatFilter(event.target.checked)}
                checked={catFilter}
              />
              <label htmlFor="checkbox-cat" className="pl-[5px]">
                Cat
              </label>
            </li>
            <li className="hover:text-[#fbc43c]">
              <input
                type="checkbox"
                name="checkbox-dog"
                onChange={(event) => setDogFilter(event.target.checked)}
                checked={dogFilter}
              />
              <label htmlFor="checkbox-dog" className="pl-[5px]">
                Dog
              </label>
            </li>
            <li className="hover:text-[#fbc43c]">
              <input
                type="checkbox"
                name="checkbox-parrot"
                onChange={(event) => setBirdFilter(event.target.checked)}
                checked={birdFilter}
              />
              <label htmlFor="checkbox-parrot" className="pl-[5px]">
                Bird
              </label>
            </li>
          </ul>
          {session?.status === "authenticated" && (
            <ul className="w-[250px] p-[10px] border-r-[1px]">
              <li className="text-neutral-100 hover:text-[#fbc43c]">
                <input
                  type="checkbox"
                  name="checkbox-myposts"
                  onChange={(event) => setMyPostsFilter(event.target.checked)}
                  checked={myPostsFilter}
                />
                <label htmlFor="checkbox-myposts" className="pl-[5px]">
                  Show only my posts
                </label>
              </li>
            </ul>
          )}
        </div>
      )}
      {filtersState && (
        <div className="flex gap-[25px]">
          <Button
            handleClick={filtersHandle}
            className="button yellow"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ok
          </Button>
          <Button
            handleClick={filtersReset}
            className="button yellow"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            disabled={!catFilter && !dogFilter && !birdFilter && !myPostsFilter}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
