"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { openArrow } from "@/utils/symbols";
import Button from "./ui/Button";
import Sort from "./Sort";

export default function Filters() {
  const [filtersState, setFiltersState] = useState<boolean>(false);

  const [catFilter, setCatFilter] = useState<boolean>(false);
  const [dogFilter, setDogFilter] = useState<boolean>(false);
  const [birdFilter, setBirdFilter] = useState<boolean>(false);
  const [myPostsFilter, setMyPostsFilter] = useState<boolean>(false);

  const [sortByDate, setSortByDate] = useState<string>("new");

  const { replace } = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const searchParams = useSearchParams();

  const toggleSortByDate = (): void => {
    setSortByDate((prevState) => {
      if (prevState === "new") return "old";
      if (prevState === "old") return "new";
    });
  };

  const toggleFilters = (): void => {
    setFiltersState((prevState) => !prevState);
  };

  const filtersHandle = () => {
    const params = new URLSearchParams();

    params.set("sortbydate", sortByDate);

    if (catFilter) params.append("type", "cat");
    else params.delete("type", "cat");

    if (dogFilter) params.append("type", "dog");
    else params.delete("type", "dog");

    if (birdFilter) params.append("type", "bird");
    else params.delete("type", "bird");

    if (myPostsFilter) params.set("myposts", "true");
    else params.delete("myposts");

    replace(`${pathname}?${params.toString()}`);
  };

  const filtersReset = (event) => {
    event.preventDefault();

    setCatFilter(false);
    setDogFilter(false);
    setBirdFilter(false);
    setMyPostsFilter(false);

    replace(`/animalsList?sortbydate=${sortByDate}`);
    // replace("/animalsList");
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("sortbydate", sortByDate);

    replace(`${pathname}?${params.toString()}`);
  }, [sortByDate]);

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-[40px] p-[5px] gap-2 bg-[#833de7] rounded-[10px]">
        <div
          className="flex items-center gap-3 text-neutral-100  hover:text-[#fbc43c] hover:cursor-pointer"
          onClick={toggleFilters}
        >
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
              type="button"
              handleClick={filtersHandle}
              className="button yellow"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ok
            </Button>
            <Button
              type="button"
              handleClick={filtersReset}
              className="button yellow"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={
                !searchParams.get("type") && !searchParams.get("myposts")
              }
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      <Sort toggleSort={toggleSortByDate} sortByDate={sortByDate} />
    </>
  );
}
