import { useState } from "react";
import {
  HiOutlineTrash,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
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
  TableHeadItem,
} from "../../../../../components/index.js";
import {
  deleteUser,
  setRole,
  updateUserAvatar,
} from "../../../../../redux/actions/userAction.js";
import { userSelector } from "../../../../../redux/slices/userSlice.js";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, userLoading } = useSelector(userSelector);
  const [showImageModal, setShowImageModal] = useState(false);
  const [image, setImage] = useState("");
  const [userSelectedIndex, setUserSelectedIndex] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return userLoading ? (
    <SpinnerLoading />
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
                <TableBodyItem className="flex gap-4 md:flex-col min-md:items-center">
                  <div className="group relative shrink-0 overflow-hidden">
                    <img
                      src={user.avatar}
                      className="inline-block h-12 w-12 rounded-full object-contain"
                    />
                    <div
                      className="absolute left-0 top-0 z-10 h-12 w-12 overflow-hidden rounded-full opacity-0 transition group-hover:cursor-pointer group-hover:opacity-100"
                      onClick={() => {
                        setUserSelectedIndex(index);
                        setShowImageModal(true);
                      }}
                    >
                      <div className="h-full w-full bg-black bg-opacity-50">
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
                        setShowDeleteModal(true);
                        setUserSelectedIndex(index);
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

      {showDeleteModal && (
        <Modal setShow={setShowDeleteModal}>
          <ModalBody>
            <IoIosWarning size={70} className="mx-auto text-red-500" />
            <p className="mb-6 mt-2 text-center text-lg">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  dispatch(deleteUser(users[userSelectedIndex]._id));
                }}
                variant="outline"
                size="sm"
              >
                Delete User
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

      {showImageModal && (
        <Modal setShow={setShowImageModal}>
          <ModalHeader title="Upload Image" />
          <ModalBody>
            <form
              className="text-right"
              onSubmit={(e) => {
                e.preventDefault();
                setShowImageModal(false);
                dispatch(updateUserAvatar({ index: userSelectedIndex, image }));
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

export default UsersTable;
