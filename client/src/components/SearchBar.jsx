import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex items-center gap-4 w-[400px] px-4 py-2 border-[1.5px] border-gray-300 text-gray-400 focus-within:text-black focus-within:border-black transition">
      <IoSearch size={20} className="" />
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full text-sm outline-none peer"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?keyword=${keyword}`);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
