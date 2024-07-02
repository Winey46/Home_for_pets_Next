import {motion} from "framer-motion";

export default function Modal(
  {
    children,
    root,
    onClose,
    ...props
  }) {

  return (
    <>
      <div className="backdrop" onClick={onClose}>
        <p className="backdrop-close">Close</p>
      </div>
      <motion.dialog
        open
        {...props}
      >
        <div className="modal-content__wrapper">
          {children}
        </div>
      </motion.dialog>
    </>
  )
}