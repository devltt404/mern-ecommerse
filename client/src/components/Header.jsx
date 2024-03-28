import {
  IoBagHandle,
  IoBagHandleOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/userAction.js";
import { cartSelector } from "../redux/slices/cartSlice.js";
import { userSelector } from "../redux/slices/userSlice.js";
import CategoryBar from "./CategoryBar.jsx";
import IconOutlineButton from "./IconOutlineButton.jsx";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
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

  return (
    <div>
      <div className="container py-8 flex items-center justify-between">
        <Logo />
        <SearchBar />

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <IconOutlineButton
            Icon={IoBagHandleOutline}
            HoverIcon={IoBagHandle}
            onClick={() => navigate("/cart")}
          >
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium h-4 aspect-square rounded-full">
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
                  <DropdownItem className="text-black font-medium border-b">
                    {user.name}
                  </DropdownItem>
                  {user.role === "admin" && (
                    <DropdownItem
                      className="text-gray-600 hover:text-black border-b font-medium"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Admin Dashboard
                    </DropdownItem>
                  )}
                  <DropdownItem
                    className="text-gray-600 hover:text-black border-b"
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
