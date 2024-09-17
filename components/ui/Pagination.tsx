"use client";

import { createArithmeticProgression } from "@/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { purpleArrow, yellowArrow } from "@/utils/symbols";
import Button from "./Button";
import { useState } from "react";

export default function Pagination({ pages }) {
  const [leftArrowColor, setLeftArrowColor] =
    useState<JSX.Element>(purpleArrow);
  const [rigthArrowColor, setRightArrowColor] =
    useState<JSX.Element>(purpleArrow);

  const pagesArr = createArithmeticProgression(pages, 1, 1);

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ul className="flex justify-center items-center gap-2 max-w-[1024px] w-full h-[50px]">
        <Button
          className="-rotate-90"
          onMouseEnter={() => setLeftArrowColor(yellowArrow)}
          onMouseLeave={() => setLeftArrowColor(purpleArrow)}
          handleClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        >
          {leftArrowColor}
        </Button>
        {pages > 7 &&
          pagesArr.map((page) => {
            if (page < 3)
              return (
                <li
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    page === currentPage
                      ? "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] bg-[#833de7] text-white hover:cursor-pointer hover:bg-[#fbc43c]"
                      : "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] hover:cursor-pointer hover:bg-[#fbc43c]"
                  }
                >
                  {page}
                </li>
              );
          })}

        {pages > 7 && currentPage > 4 && (
          <li className="w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600">
            ...
          </li>
        )}

        {pages > 7 &&
          pagesArr.map((page) => {
            if (
              (page === currentPage ||
                page === currentPage + 1 ||
                page === currentPage - 1) &&
              page > 2 &&
              page < pages - 1
            )
              return (
                <li
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    page === currentPage
                      ? "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] bg-[#833de7] text-white hover:cursor-pointer hover:bg-[#fbc43c]"
                      : "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] hover:cursor-pointer hover:bg-[#fbc43c]"
                  }
                >
                  {page}
                </li>
              );
          })}

        {pages > 7 && currentPage < pages - 2 && (
          <li className="w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600">
            ...
          </li>
        )}

        {pages > 7 &&
          pagesArr.map((page) => {
            if (page === pages || page === pages - 1)
              return (
                <li
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    page === currentPage
                      ? "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] bg-[#833de7] text-white hover:cursor-pointer hover:bg-[#fbc43c]"
                      : "w-[32px] h-[32px] flex justify-center items-center rounded-[50%] border-[1px] border-gray-600 p-[10px] hover:cursor-pointer hover:bg-[#fbc43c]"
                  }
                >
                  {page}
                </li>
              );
          })}
        <Button
          className="rotate-90"
          onMouseEnter={() => setRightArrowColor(yellowArrow)}
          onMouseLeave={() => setRightArrowColor(purpleArrow)}
          handleClick={() =>
            handlePageChange(currentPage !== pages ? currentPage + 1 : pages)
          }
        >
          {rigthArrowColor}
        </Button>
      </ul>
    </>
  );
}
