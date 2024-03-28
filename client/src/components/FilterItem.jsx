const FilterItem = ({ children, title }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg mb-2 font-medium">{title}</h3>

      {children}
    </div>
  );
};

export default FilterItem;
