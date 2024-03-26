import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";
import { getCategories } from "../redux/actions/categoryAction.js";
import { getUser } from "../redux/actions/userAction.js";

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
    <Loading />
  ) : (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ShopContainer;
