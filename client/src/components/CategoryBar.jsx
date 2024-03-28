import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { categorySelector } from "../redux/slices/categorySlice.js";

const CategoryBar = () => {
  const { categories } = useSelector(categorySelector);

  return (
    categories && (
      <nav className="bg-black ">
        <ul className="container flex items-center justify-between">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={"/category/" + category.hyphenSeparated}
            >
              <li className="text-gray-200 font-medium hover:text-white transition cursor-pointer py-3">
                {category.name.toUpperCase()}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    )
  );
};

export default CategoryBar;
