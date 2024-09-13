"use client";

import { createArithmeticProgression } from "@/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ pages }) {
  const pagesArr = createArithmeticProgression(pages, 1, 1);

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="flex gap-2">
      {pagesArr.map((page) => (
        <li
          key={page}
          className={
            page === currentPage
              ? "border-[1px] border-gray-600 rounded-sm px-[7.5px] bg-[#833de7] text-white hover:cursor-pointer hover:bg-[#fbc43c]"
              : "border-[1px] border-gray-600 rounded-sm px-[7.5px] hover:cursor-pointer hover:bg-[#fbc43c]"
          }
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
}
