const FilterItem = ({ children, title }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-lg font-medium">{title}</h3>

      {children}
    </div>
  );
};

export default FilterItem;
