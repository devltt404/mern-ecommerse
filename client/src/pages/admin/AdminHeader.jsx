const AdminHeader = () => {
  return (
    <div className="sticky z-10 top-0 py-4 px-6 bg-white flex justify-between items-center shadow-md">
      <p className="text-lg font-semibold">Welcome back Admin!</p>
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default AdminHeader;
