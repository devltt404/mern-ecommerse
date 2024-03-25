import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoriesSelector } from "../redux/slices/categoriesSlice.js";

const CategoryBar = () => {
  const { categories } = useSelector(categoriesSelector);

  return (
    categories && (
      <nav className="bg-gray-100 py-3">
        <ul className="container flex item-center justify-between">
          {categories.map((category) => (
            <li
              key={category._id}
              className="font-semibold text-gray-700 hover:text-black transition cursor-pointer"
            >
              <Link to={"/category/" + category.hyphenSeparated}>
                {category.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default CategoryBar;
