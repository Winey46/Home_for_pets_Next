import {information} from "@/utils/texts";

const InformationPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="w-full text-justify min-h-[576px] border-[1px] border-gray-400 rounded-[10px] py-[5px] px-[25px] background-grey max-lg:w-[90%]">
        {information}
      </p>
    </div>
  )
}

export default InformationPage;