import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  SpinnerLoading,
  Table,
  TableBody,
  TableBodyItem,
  TableBodyRow,
  TableHead,
} from "../../../../../components/index.js";
import {
  deleteProduct,
  getProducts,
  updateProductImage,
} from "../../../../../redux/actions/productAction.js";
import { productSelector } from "../../../../../redux/slices/productSlice.js";

const ProductsTable = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, productLoading } = useSelector(productSelector);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [productSelectedIndex, setProductSelectedIndex] = useState(-1);

  useEffect(() => {
    dispatch(getProducts({ page, limit: 5 }));
  }, [searchParams]);

  return (
    <>
      {productLoading ? (
        <SpinnerLoading />
      ) : (
        <Table>
          <TableHead>
            <TableBodyItem className="text-left">PRODUCT</TableBodyItem>
            <TableBodyItem className="text-center">PRICE</TableBodyItem>
            <TableBodyItem className="text-center">SOLD</TableBodyItem>
            <TableBodyItem className="text-center">STOCK</TableBodyItem>
            <TableBodyItem className="text-right">ACTIONS</TableBodyItem>
          </TableHead>
          <TableBody>
            {products.length > 0 &&
              products.map((product, index) => (
                <TableBodyRow key={product._id}>
                  <TableBodyItem className="flex min-w-60 gap-3 md:flex-col min-md:items-center">
                    <div className="group relative shrink-0 overflow-hidden">
                      <img
                        src={product.images[0]}
                        className="inline-block h-20 w-20 object-contain"
                      />

                      <div
                        className="absolute left-0 top-0 z-10 h-20 w-20 opacity-0 transition group-hover:cursor-pointer group-hover:opacity-100"
                        onClick={() => {
                          setProductSelectedIndex(index);
                          setShowModal(true);
                        }}
                      >
                        <div className="h-full w-full bg-black bg-opacity-50">
                          <TbUpload
                            size="35"
                            className="mx-auto translate-y-1/2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        {product.category.name}
                      </p>
                      <p className="font-semibold">{product.name}</p>
                    </div>
                  </TableBodyItem>
                  <TableBodyItem className="text-center font-medium">
                    ${product.price}
                  </TableBodyItem>
                  <TableBodyItem className="text-center">
                    {product.numSold || 0}
                  </TableBodyItem>
                  <TableBodyItem className="text-center">
                    {product.stock}
                  </TableBodyItem>
                  <TableBodyItem className="text-center">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/admin/products/edit/" + product._id);
                        }}
                      >
                        <HiOutlinePencilSquare size={22} />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteProduct(product._id))}
                      >
                        <HiOutlineTrash size={22} />
                      </button>
                    </div>
                  </TableBodyItem>
                </TableBodyRow>
              ))}
          </TableBody>
        </Table>
      )}

      {showModal && (
        <Modal setShow={setShowModal}>
          <ModalHeader title="Upload Image" />
          <ModalBody>
            <form
              className="text-right"
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                dispatch(
                  updateProductImage({ image, index: productSelectedIndex }),
                );
              }}
            >
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mb-6 w-full border-b border-b-gray-300 py-2 outline-none focus:border-b-gray-500"
                type="text"
                placeholder="Enter image URL"
                autoFocus
              />
              <Button type="submit" variant="fill" size="sm">
                Update
              </Button>
            </form>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default ProductsTable;
