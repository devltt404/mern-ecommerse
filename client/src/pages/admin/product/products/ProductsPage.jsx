import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, TableWithPagination } from "../../../../components/index.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";
import ProductsTable from "./components/ProductsTable.jsx";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const { totalProducts, pagination } = useSelector(productSelector);

  return (
    <div>
      <div className="mb-6 text-right">
        <Button
          variant="fill"
          size="sm"
          onClick={() => {
            navigate("/admin/products/add");
          }}
        >
          <div className="flex items-center gap-1">
            <FaPlus size={18} />
            Add Product
          </div>
        </Button>
      </div>
      <h1 className="mb-6 text-2xl font-semibold">
        Products <span className="font-normal">({totalProducts})</span>
      </h1>

      <TableWithPagination
        Table={ProductsTable}
        page={page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          navigate(`/admin/products?page=${page}`);
        }}
      />
    </div>
  );
};

export default ProductsPage;
