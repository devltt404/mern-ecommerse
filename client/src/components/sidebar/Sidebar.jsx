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
        } fixed left-0 top-0 z-50 h-screen w-80 bg-white transition duration-300 ease-in-out`}
      >
        {children}
      </aside>
    </>
  );
};

export default Sidebar;
