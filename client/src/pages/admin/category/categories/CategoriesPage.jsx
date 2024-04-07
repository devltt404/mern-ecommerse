import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader } from "../../../../components";
import { addCategory } from "../../../../redux/actions/categoryAction.js";
import { categorySelector } from "../../../../redux/slices/categorySlice.js";
import CategoriesTable from "./components/CategoriesTable.jsx";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(categorySelector);
  const [showModal, setShowModal] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const { categoryError } = useSelector(categorySelector);

  return (
    <div>
      <div className="mb-6 text-right">
        <Button
          variant="fill"
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div className="flex items-center gap-1">
            <FaPlus size={18} />
            Add Category
          </div>
        </Button>

        {showModal && (
          <Modal setShow={setShowModal}>
            <ModalHeader title="Add Category" />
            <ModalBody>
              <form
                className="text-right"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await dispatch(addCategory(categoryInput));

                  setShowModal(false);
                }}
              >
                <input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="mb-6 w-full border-b border-b-gray-300 py-2 outline-none focus:border-b-gray-500"
                  type="text"
                  placeholder="Enter the category name"
                  autoFocus
                />
                <Button type="submit" variant="fill" size="sm">
                  Add Category
                </Button>
              </form>
            </ModalBody>
          </Modal>
        )}
      </div>

      <h1 className="mb-6 text-2xl font-semibold">
        Categories <span className="font-normal">({categories.length})</span>
      </h1>
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
