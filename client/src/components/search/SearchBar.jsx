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
      className="flex w-[500px] items-center gap-4 border border-gray-300 px-4 py-2 text-gray-400 transition focus-within:border-black focus-within:shadow-outer shadow-black focus-within:text-black lg:w-[400px] md:order-1 md:w-full"
    >
      <IoSearch size={20} className="" />
      <input
        ref={ref}
        type="text"
        placeholder="Search for products..."
        className="peer w-full outline-none"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
