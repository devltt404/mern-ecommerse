import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categorySelector } from "../redux/slices/categorySlice.js";
import Sidebar from "./Sidebar.jsx";
import { CgFilters } from "react-icons/cg";
import { MdFilterListAlt } from "react-icons/md";

const CategoryBar = () => {
  const { categories } = useSelector(categorySelector);

  return (
    categories && (
      <>
        <nav className="bg-black lg:hidden">
          <ul className="container flex items-center justify-between">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={"/category/" + category.hyphenSeparated}
              >
                <li className="py-[0.85rem] font-medium text-gray-200 transition cursor-pointer hover:text-white">
                  {category.name.toUpperCase()}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </>
    )
  );
};

export default CategoryBar;
