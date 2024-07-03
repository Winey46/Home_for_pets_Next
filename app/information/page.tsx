import '@/styles/information.scss';
import {information} from "@/utils/information-text";

const InformationPage = () => {
  return (
    <div className="information-wrapper">
      <p className="information-text">{information}</p>
    </div>
  )
}

export default InformationPage;