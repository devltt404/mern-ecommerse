import { CgMenu } from "react-icons/cg";

const AdminHeader = ({ setShowSidebar }) => {
  return ( 
    <div className="sticky top-0 z-10 flex items-center justify-between px-10 py-4 bg-white shadow-md md:px-5 ">
      <button
        type="button"
        className="min-lg:hidden"
        onClick={() => {
          setShowSidebar(true);
        }}
      >
        <CgMenu size={25} />
      </button>
      <p className="text-lg font-semibold">Welcome back Admin!</p>
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt=""
          className="object-contain w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default AdminHeader;
