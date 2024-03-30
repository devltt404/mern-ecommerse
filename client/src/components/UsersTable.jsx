import { useEffect, useState } from "react";
import {
  HiOutlineTrash,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  setRole,
  updateUserAvatar,
} from "../redux/actions/userAction.js";
import { userSelector } from "../redux/slices/userSlice.js";
import Badge from "./Badge.jsx";
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
                <TableBodyItem className="flex md:flex-col min-md:items-center gap-4">
                  <div className="shrink-0 relative overflow-hidden group">
                    <img
                      src={user.avatar}
                      className="inline-block object-contain w-12 h-12 rounded-full"
                    />
                    <div
                      className="absolute top-0 left-0 z-10 w-12 h-12 rounded-full overflow-hidden transition opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
                      onClick={() => {
                        setUserSelectedIndex(index);
                        setShowModal(true);
                      }}
                    >
                      <div className="w-full h-full bg-black bg-opacity-50">
                        <TbUpload
                          size="20"
                          className="mx-auto text-white translate-y-1/2"
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
                  <Badge color={user.role === "admin" ? "red" : "blue"}>
                    {user.role}
                  </Badge>
                </TableBodyItem>
                <TableBodyItem>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => dispatch(setRole(user._id))}
                    >
                      {user.role === "admin" ? (
                        <HiOutlineUserMinus size={22} />
                      ) : (
                        <HiOutlineUserPlus size={22} />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        dispatch(deleteUser(user._id));
                      }}
                    >
                      <HiOutlineTrash size={22} />
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

export default UsersTable;
