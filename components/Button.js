import {motion} from "framer-motion";

export default function Button(
  {
    children,
    ...props
  }) {
  return (
    <motion.button {...props}>
      {children}
    </motion.button>
  )
}