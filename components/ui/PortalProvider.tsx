import {createPortal} from "react-dom";
import {ReactNode} from "react";

interface PortalProviderProps {
  children: ReactNode;
  root: string;
}

export default function PortalProvider({children, root}: PortalProviderProps) {
  const tag = document.getElementById(root) as Element

  return (
    createPortal(children, tag)
  )
}