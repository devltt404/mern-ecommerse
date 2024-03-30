import { cloneElement, useEffect, useRef } from "react";

const Sidebar = ({ ToggleButton, children, showSidebar, setShowSidebar }) => {
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {cloneElement(ToggleButton, {
        onClick: () => setShowSidebar(!showSidebar),
      })}

      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
      )}

      <aside
        ref={ref}
        className={`${
          !showSidebar
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        } transition duration-300 ease-in-out z-50 fixed top-0 left-0 h-screen bg-white w-80`}
      >
        {children}
      </aside>
    </>
  );
};

export default Sidebar;
