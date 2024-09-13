"use client";

import { motion } from "framer-motion";
import { openArrow } from "@/utils/symbols";

interface ISortProps {
  toggleSort: () => void;
  sortByDate: string;
}

export default function Sort({ toggleSort, sortByDate }: ISortProps) {
  return (
    <div
      className="self-start h-[40px] px-[25px] flex justify-center items-center bg-[#fbc43c] rounded-[10px]"
      onClick={toggleSort}
    >
      by date
      <motion.span
        className="flex items-center justify-center"
        animate={{ rotate: sortByDate === "old" ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {openArrow}
      </motion.span>
    </div>
  );
}
