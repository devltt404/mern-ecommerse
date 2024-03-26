import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";
import ProductsTable from "../../components/ProductsTable.jsx";
import TableWithPagination from "../../components/TableWithPagination.jsx";
import { getProducts } from "../../redux/actions/productAction.js";
import { productSelector } from "../../redux/slices/productSlice.js";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalProducts, pagination } = useSelector(productSelector);

  return (
    <div>
      <div className="text-right mb-4">
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
      <h1 className="mb-4 text-2xl font-semibold">
        Products <span className="font-normal">({totalProducts})</span>
      </h1>

      <TableWithPagination
        Table={ProductsTable}
        page={pagination.page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          dispatch(getProducts({ page, limit: 5 }));
        }}
      />
    </div>
  );
};

export default ProductsPage;
