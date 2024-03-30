import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
  updateProductImage,
} from "../redux/actions/productAction.js";
import { productSelector } from "../redux/slices/productSlice.js";
import Button from "./Button.jsx";
import Loading from "./Loading.jsx";
import Modal from "./modal/Modal.jsx";
import ModalBody from "./modal/ModalBody.jsx";
import ModalHeader from "./modal/ModalHeader.jsx";
import Table from "./table/Table.jsx";
import TableBody from "./table/TableBody.jsx";
import TableBodyItem from "./table/TableBodyItem.jsx";
import TableBodyRow from "./table/TableBodyRow.jsx";
import TableHead from "./table/TableHead.jsx";

const ProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, productLoading } = useSelector(productSelector);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [productSelectedIndex, setProductSelectedIndex] = useState(-1);

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 5 }));
  }, []);

  return (
    <>
      {productLoading ? (
        <Loading />
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
                  <TableBodyItem className="flex md:flex-col min-md:items-center min-w-60 gap-3">
                    <div className="relative overflow-hidden group shrink-0">
                      <img
                        src={product.images[0]}
                        className="inline-block object-contain w-20 h-20"
                      />

                      <div
                        className="absolute top-0 left-0 z-10 w-20 h-20 transition opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
                        onClick={() => {
                          setProductSelectedIndex(index);
                          setShowModal(true);
                        }}
                      >
                        <div className="w-full h-full bg-black bg-opacity-50">
                          <TbUpload
                            size="35"
                            className="mx-auto text-white translate-y-1/2"
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
                  <TableBodyItem className="font-medium text-center">
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
                          navigate("/admin/products/edit");
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
                  updateProductImage({ image, index: productSelectedIndex })
                );
              }}
            >
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full py-2 mb-6 border-b outline-none border-b-gray-300 focus:border-b-gray-500"
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
