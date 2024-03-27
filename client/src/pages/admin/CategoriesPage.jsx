import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Button from "../../components/Button.jsx";
import CategoriesTable from "../../components/CategoriesTable.jsx";
import { categorySelector } from "../../redux/slices/categorySlice.js";

const CategoriesPage = () => {
  const { categories } = useSelector(categorySelector);

  return (
    <div>
      <div className="text-right mb-6">
        <Button
          variant="fill"
          size="sm"
          onClick={() => {
            navigate("/admin/products/add");
          }}
        >
          <div className="flex items-center gap-1">
            <FaPlus size={18} />
            Add Category
          </div>
        </Button>
      </div>

      <h1 className="mb-4 text-2xl font-semibold">
        Categories <span className="font-normal">({categories.length})</span>
      </h1>
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
