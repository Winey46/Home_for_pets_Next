import "@/styles/navigation.scss"
import {shortArrow} from "@/utils/symbols";
import NavLink from "@/components/NavLink";

export default function Navigation() {
  return (
    <nav id="navigation">
      <ul className="navigation-list">
        <li>
          <NavLink href="/" />
        </li>
        {shortArrow}
        <li>
          <NavLink href="/animalsList" />
        </li>
        {/*{index > 0 &&*/}
        {/*  <li>*/}
        {/*    <span className="navigation-arrow">{shortArrow}</span>*/}
        {/*    <Link*/}
        {/*      className={path.startsWith('/animalsList') ? 'navigation-active' : 'navigation-not-active'}*/}
        {/*      href={path}*/}
        {/*    >{link2}</Link>*/}
        {/*  </li>*/}
        {/*}*/}
      </ul>
    </nav>
  )
}