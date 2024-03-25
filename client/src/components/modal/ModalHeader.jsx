import { IoClose } from "react-icons/io5";

const ModalHeader = ({ setShow, title }) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b border-b-gray-300 py-4 px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button type="button" onClick={() => setShow(false)}>
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
