import Spinner from "../loading/Spinner.jsx";

const Button = ({
  type = "button",
  variant,
  children,
  disabled = false,
  width = "auto",
  size = "md",
  isLoading = false,
  className ="",
  ...props
}) => {
  if (isLoading) disabled = true;

  const sizeClasses = {
    xs: "py-2 px-3 text-sm",
    sm: "py-3 px-5 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const widthClasses = {
    auto: "w-auto",
    full: "w-full",
  };

  const variantClasses = {
    outline: "border border-black hover:bg-gray-50",
    fill: "bg-black text-white hover:shadow-lg disabled:hover:shadow-none",
    "inverse-fill":
      "bg-white text-black border-2 border-black hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`relative font-medium transition  disabled:opacity-70 ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses[width]} ${className}`}
      {...props}
    >
      {isLoading && (
        <div
          className={`absolute ${
            size === "sm" ? "w-4" : "w-5"
          } left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <Spinner borderWidth="thin" />
        </div>
      )}
      <div className={`${isLoading && "invisible"}`}>{children}</div>
    </button>
  );
};

export default Button;
