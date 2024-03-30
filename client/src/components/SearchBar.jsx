import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search?keyword=${keyword}`);
        ref.current.blur();
        setKeyword("");
      }}
      className="w-[500px] md:w-full lg:w-[400px] md:order-1 flex items-center gap-4 px-4 py-2 border-[1.5px] border-gray-300 text-gray-400 focus-within:text-black focus-within:border-black transition"
    >
      <IoSearch size={20} className="" />
      <input
        ref={ref}
        type="text"
        placeholder="Search for products..."
        className="w-full outline-none peer"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
