import { Children, cloneElement, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

const Modal = ({ children, setShow }) => {
  const modalContainer = useRef();
  const modalContent = useRef();

  useEffect(() => {
    const handleClick = modalContainer.current.addEventListener(
      "click",
      (e) => {
        if (modalContent.current) {
          if (!modalContent.current.contains(e.target)) {
            setShow(false);
          }

          return modalContainer.current.removeEventListener(
            "click",
            handleClick,
          );
        }
      },
    );
  }, []);

  const outerAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 200 },
  });

  const innerAnimation = useSpring({
    opacity: 1,
    scale: 1,
    from: { scale: 0.6, opacity: 0 },
    config: { duration: 200 },
  });

  return (
    <animated.div
      className="fixed inset-0 z-50 "
      ref={modalContainer}
      style={outerAnimation}
    >
      <div
        className="z-50 h-full w-full bg-[rgba(0,0,0,0.5)]"
        onClick={() => setShow(false)}
      ></div>

      <animated.div
        style={innerAnimation}
        className="fixed inset-0 z-50 flex min-h-screen items-center justify-center"
      >
        <div className="w-full  max-w-md bg-white" ref={modalContent}>
          {Children.map(children, (child) => {
            return cloneElement(child, { setShow });
          })}
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
