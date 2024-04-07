import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getCategories } from "../../redux/actions/categoryAction.js";
import { getUser } from "../../redux/actions/userAction.js";

import { Footer, Header, SpinnerLoading } from "../index.js";

const ShopContainer = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  const intialLoad = async () => {
    await dispatch(getUser());
    await dispatch(getCategories());
    setInitialLoading(false);
  };

  useEffect(() => {
    intialLoad();
  }, []);

  return initialLoading ? (
    <SpinnerLoading />
  ) : (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopContainer;
