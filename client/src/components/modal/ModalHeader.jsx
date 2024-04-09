import { IoClose } from "react-icons/io5";

const ModalHeader = ({ setShow, title }) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-gray-300 px-6 py-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button type="button" onClick={() => setShow(false)}>
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
