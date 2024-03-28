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
                  <TableBodyItem className="flex items-center gap-3">
                    <div className="relative overflow-hidden  group">
                      <img
                        src={product.images[0]}
                        className="w-20 h-20 object-contain inline-block"
                      />
                      <div
                        className="w-full h-full absolute z-10 top-0 left-0 opacity-0 transition group-hover:opacity-100 group-hover:cursor-pointer"
                        onClick={() => {
                          setProductSelectedIndex(index);
                          setShowModal(true);
                        }}
                      >
                        <div className="bg-black bg-opacity-50 w-full h-full">
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
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/admin/products/edit");
                        }}
                      >
                        <HiOutlinePencilSquare size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteProduct(product._id))}
                      >
                        <HiOutlineTrash size={20} />
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
                className="w-full py-2 outline-none border-b border-b-gray-300 focus:border-b-gray-500 mb-6"
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
