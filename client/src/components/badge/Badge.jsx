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
      className={`me-2 rounded-full px-2.5 py-0.5 text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
