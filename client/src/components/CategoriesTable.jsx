import { useEffect } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoriesAction.js";
import { categoriesSelector } from "../redux/slices/categoriesSlice.js";
import Loading from "./Loading.jsx";
import Table from "./table/Table.jsx";
import TableBody from "./table/TableBody.jsx";
import TableBodyItem from "./table/TableBodyItem.jsx";
import TableBodyRow from "./table/TableBodyRow.jsx";
import TableHead from "./table/TableHead.jsx";
import TableHeadItem from "./table/TableHeadItem.jsx";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories, categoriesLoading } = useSelector(categoriesSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return categoriesLoading ? (
    <Loading />
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
          {categories.map((category, index) => {
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
                  <div className="flex items-center gap-2 justify-end">
                    <HiOutlinePencilSquare size={20} />
                    <HiOutlineTrash size={20} />
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
