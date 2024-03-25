import React, { Children, cloneElement, useEffect, useRef } from "react";

const Modal = ({ children, setShow }) => {
  const modalContainer = useRef();
  const modalContent = useRef();

  useEffect(() => {
    setTimeout(() => modalContainer.current.classList.remove("opacity-0"), 0);

    if (modalContainer.current && modalContent.current) {
      const handleClick = modalContainer.current.addEventListener(
        "click",
        (e) => {
          if (
            modalContent.current &&
            !modalContent.current.contains(e.target)
          ) {
            setShow(false);
          }

          return modalContainer.current.removeEventListener(
            "click",
            handleClick
          );
        }
      );
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 opacity-0 transition duration-300"
      ref={modalContainer}
    >
      <div
        className="w-full h-full z-50 bg-[rgba(0,0,0,0.5)]"
        onClick={() => setShow(false)}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-md w-full max-w-md" ref={modalContent}>
          {Children.map(children, (child) => {
            return cloneElement(child, { setShow });
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
