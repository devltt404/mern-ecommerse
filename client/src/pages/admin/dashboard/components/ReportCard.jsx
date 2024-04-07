import { MdKeyboardArrowRight } from "react-icons/md";
import { SkeletonWrapper } from "../../../../components/index.js";

const ReportCard = ({ Icon, title, value, isLoading }) => {
  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="group relative cursor-pointer bg-white px-6 py-6 shadow-md  transition hover:scale-[1.03] hover:bg-black hover:shadow-lg">
        <div className="mb-6 flex items-center gap-4">
          <div className="inline-block rounded-full bg-gray-100 p-3 group-hover:bg-white">
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

        <div className="absolute bottom-6 right-4 opacity-100 transition group-hover:opacity-100 ">
          <MdKeyboardArrowRight className="text-white" size={30} />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default ReportCard;
