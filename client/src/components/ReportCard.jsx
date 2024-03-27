import { MdKeyboardArrowRight } from "react-icons/md";
import SkeletonWrapper from "./SkeletonWrapper.jsx";

const ReportCard = ({ Icon, title, value, isLoading }) => {
  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="group transition bg-white hover:bg-black px-6 py-6 shadow-md  hover:scale-[1.03] hover:shadow-lg cursor-pointer relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-block rounded-full p-3 bg-gray-100 group-hover:bg-white">
            <Icon size={24} />
          </div>
          <span className="font-semibold text-gray-600 group-hover:text-gray-300">
            {title}
          </span>
        </div>

        <div>
          <p className="text-3xl font-semibold text-gray-800 group-hover:text-white">
            {value}
          </p>
        </div>

        <div className="absolute right-4 bottom-6 opacity-100 transition group-hover:opacity-100 ">
          <MdKeyboardArrowRight className="text-white" size={30} />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default ReportCard;
