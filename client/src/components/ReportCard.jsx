import { MdKeyboardArrowRight } from "react-icons/md";

const ReportCard = ({ Icon, title, value }) => {
  return (
    <div className="bg-white px-6 py-4 shadow-md transition hover:scale-105 hover:shadow-lg cursor-pointer relative group">
      <div className="flex items-center gap-4 mb-4">
        <div className="inline-block rounded-full p-3 bg-gray-100">
          <Icon size={24} className="text-stone-700" />
        </div>
        <span className="font-semibold text-gray-600">{title}</span>
      </div>

      <div>
        <span className="text-3xl font-semibold text-gray-800">{value}</span>
      </div>

      <div className="absolute right-4 bottom-4 opacity-0 transition group-hover:opacity-100">
        <MdKeyboardArrowRight size={28} />
      </div>
    </div>
  );
};

export default ReportCard;
