import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex items-center gap-4 w-[400px] rounded-3xl px-4 py-2 border border-gray-300">
      <IoSearch size={20} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full text-sm outline-none"
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
