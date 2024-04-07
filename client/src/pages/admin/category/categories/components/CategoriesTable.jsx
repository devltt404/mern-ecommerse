import { useEffect } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../../../../redux/actions/categoryAction.js";
import { categorySelector } from "../../../../../redux/slices/categorySlice.js";

import {
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

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return categoryLoading ? (
    <SpinnerLoading />
  ) : (
    <div>
      <Table>
        <TableHead>
          <TableHeadItem className="text-left">id</TableHeadItem>
          <TableHeadItem className="text-center">CATEGORY</TableHeadItem>
          <TableHeadItem className="text-center">CREATED AT</TableHeadItem>
          <TableHeadItem className="text-right">ACTIONS</TableHeadItem>
        </TableHead>

        <TableBody>
          {categories.map((category) => {
            return (
              <TableBodyRow key={category._id}>
                <TableBodyItem className="text-left">
                  {category._id}
                </TableBodyItem>
                <TableBodyItem className="text-center">
                  {category.name}
                </TableBodyItem>
                <TableBodyItem className="text-center">
                  {category.createdAt}
                </TableBodyItem>
                <TableBodyItem className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <HiOutlinePencilSquare size={22} />
                    <button type="button">
                      <HiOutlineTrash
                        size={22}
                        onClick={() => dispatch(deleteCategory(category._id))}
                      />
                    </button>
                  </div>
                </TableBodyItem>
              </TableBodyRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
