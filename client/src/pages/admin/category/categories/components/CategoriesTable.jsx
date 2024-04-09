import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getDetailedCategories,
} from "../../../../../redux/actions/categoryAction.js";
import { categorySelector } from "../../../../../redux/slices/categorySlice.js";

import { IoIosWarning } from "react-icons/io";
import {
  Button,
  Modal,
  ModalBody,
  SpinnerLoading,
  Table,
  TableBody,
  TableBodyItem,
  TableBodyRow,
  TableHead,
  TableHeadItem,
} from "../../../../../components";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories, categoryLoading } = useSelector(categorySelector);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categorySelectedIndex, setCategorySelectedIndex] = useState(-1);

  useEffect(() => {
    dispatch(getDetailedCategories());
  }, []);

  return categoryLoading ? (
    <SpinnerLoading />
  ) : (
    <div>
      <Table>
        <TableHead>
          <TableHeadItem className="text-left">NAME</TableHeadItem>
          <TableHeadItem className="text-center">NUM PRODUCTS</TableHeadItem>
          <TableHeadItem className="text-right">ACTIONS</TableHeadItem>
        </TableHead>

        <TableBody>
          {categories.map((category, index) => {
            return (
              <TableBodyRow key={category._id}>
                <TableBodyItem className="text-left">
                  {category.name}
                </TableBodyItem>
                <TableBodyItem className="text-center">
                  {category.numProducts}
                </TableBodyItem>

                <TableBodyItem className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <HiOutlinePencilSquare size={22} />
                    <button type="button">
                      <HiOutlineTrash
                        size={22}
                        onClick={() => {
                          setCategorySelectedIndex(index);
                          setShowDeleteModal(true);
                        }}
                      />
                    </button>
                  </div>
                </TableBodyItem>
              </TableBodyRow>
            );
          })}
        </TableBody>
      </Table>

      {showDeleteModal && (
        <Modal setShow={setShowDeleteModal}>
          <ModalBody>
            <IoIosWarning size={70} className="mx-auto text-red-500" />
            <p className="mb-6 mt-2 text-center text-lg">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  dispatch(
                    deleteCategory(categories[categorySelectedIndex]),
                  );
                }}
                variant="outline"
                size="sm"
              >
                Delete Category
              </Button>

              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="fill"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesTable;
