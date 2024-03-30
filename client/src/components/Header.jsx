import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import {
  IoBagHandle,
  IoBagHandleOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/userAction.js";
import { cartSelector } from "../redux/slices/cartSlice.js";
import { categorySelector } from "../redux/slices/categorySlice.js";
import { userSelector } from "../redux/slices/userSlice.js";
import CategoryBar from "./CategoryBar.jsx";
import IconOutlineButton from "./IconOutlineButton.jsx";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import Sidebar from "./Sidebar.jsx";
import Dropdown from "./dropdown/Dropdown.jsx";
import DropdownItem from "./dropdown/DropdownItem.jsx";
import DropdownMenu from "./dropdown/DropdownMenu.jsx";
import DropdownToggler from "./dropdown/DropdownToggler.jsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { cart } = useSelector(cartSelector);
  const { categories } = useSelector(categorySelector);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="lg:border-b lg:shadow-md">
      <div className="container flex flex-wrap items-center justify-between py-8 md:py-6 gap-y-4">
        <Logo />

        <SearchBar />

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Menu for Small Device */}
          <div className="min-lg:hidden">
            <Sidebar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              ToggleButton={
                <button type="button" className="mt-2">
                  <CgMenu size={20} />
                </button>
              }
            >
              <ul>
                <h2 className="px-6 py-4 text-2xl font-semibold">Categories</h2>
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category.hyphenSeparated}`}
                      onClick={() => setShowSidebar(false)}
                      className="block w-full h-full px-6 py-4 transition hover:bg-gray-100 hover:font-medium"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Sidebar>
          </div>

          <IconOutlineButton
            Icon={IoBagHandleOutline}
            HoverIcon={IoBagHandle}
            onClick={() => navigate("/cart")}
          >
            <span className="absolute h-4 text-xs font-medium text-white bg-red-600 rounded-full -top-2 -right-2 aspect-square">
              {cart.length}
            </span>
          </IconOutlineButton>

          {/* User Icon */}
          <Dropdown className="h-[20px]">
            <DropdownToggler>
              <IconOutlineButton Icon={IoPersonOutline} HoverIcon={IoPerson} />
            </DropdownToggler>

            <DropdownMenu position="right">
              {user ? (
                <>
                  <DropdownItem className="font-medium text-black border-b">
                    {user.name}
                  </DropdownItem>
                  {user.role === "admin" && (
                    <DropdownItem
                      className="font-medium text-gray-600 border-b hover:text-black"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Admin Dashboard
                    </DropdownItem>
                  )}
                  <DropdownItem
                    className="text-gray-600 border-b hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    My Orders
                  </DropdownItem>
                  <DropdownItem
                    className="text-gray-600 hover:text-black"
                    onClick={() => dispatch(logoutUser())}
                  >
                    Logout
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    className="text-gray-600 hover:text-black"
                    onClick={() =>
                      navigate("/login", {
                        state: {
                          from:
                            location?.pathname === "/login" ||
                            location?.pathname === "/register"
                              ? null
                              : location,
                        },
                      })
                    }
                  >
                    Login
                  </DropdownItem>
                  <DropdownItem
                    className="text-gray-600 hover:text-black"
                    onClick={() =>
                      navigate("/register", {
                        state: {
                          from:
                            location.pathname == "/login" ||
                            location.pathname == "register"
                              ? null
                              : location,
                        },
                      })
                    }
                  >
                    Register
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <CategoryBar />
    </div>
  );
};

export default Header;
