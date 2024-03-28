const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
