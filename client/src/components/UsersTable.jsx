import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  updateUserAvatar,
} from "../redux/actions/userAction.js";
import { userSelector } from "../redux/slices/userSlice.js";
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
import TableHeadItem from "./table/TableHeadItem.jsx";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, userLoading } = useSelector(userSelector);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [userSelectedIndex, setUserSelectedIndex] = useState(-1);

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: 5 }));
  }, []);

  return userLoading ? (
    <Loading />
  ) : (
    <>
      <Table>
        <TableHead>
          <TableHeadItem className="text-left">NAME</TableHeadItem>
          <TableHeadItem className="text-center">ORDERS</TableHeadItem>
          <TableHeadItem className="text-center">ROLE</TableHeadItem>
          <TableHeadItem className="text-right">ACTIONS</TableHeadItem>
        </TableHead>
        <TableBody>
          {users.map((user, index) => {
            return (
              <TableBodyRow key={user._id}>
                <TableBodyItem className="flex items-center gap-4">
                  <div className="relative overflow-hidden rounded-md group">
                    <img
                      src={user.avatar}
                      className="w-10 h-10 object-cover rounded-full inline-block"
                    />
                    <div
                      className="w-full h-full absolute z-10 top-0 left-0 opacity-0 transition group-hover:opacity-100 group-hover:cursor-pointer"
                      onClick={() => {
                        setUserSelectedIndex(index);
                        setShowModal(true);
                      }}
                    >
                      <div className="bg-black bg-opacity-50 w-full h-full">
                        <TbUpload
                          size="20"
                          className="mx-auto translate-y-1/2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </TableBodyItem>
                <TableBodyItem className="text-center">
                  {user.orders.length}
                </TableBodyItem>
                <TableBodyItem className="text-center">
                  {user.role}
                </TableBodyItem>
                <TableBodyItem>
                  <div className="flex items-center gap-2 justify-end">
                    <HiOutlinePencilSquare size={20} />
                    <button
                      onClick={() => {
                        dispatch(deleteUser(user._id));
                      }}
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </TableBodyItem>
              </TableBodyRow>
            );
          })}
        </TableBody>
      </Table>

      {showModal && (
        <Modal setShow={setShowModal}>
          <ModalHeader title="Upload Image" />
          <ModalBody>
            <form
              className="text-right"
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                dispatch(updateUserAvatar({ index: userSelectedIndex, image }));
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

export default UsersTable;
